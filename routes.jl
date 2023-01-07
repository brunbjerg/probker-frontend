using Genie
using Genie.Router
using Genie.Renderer.Html
using SimpleWebsockets
using Probker
using JSON

route("/hello") do 
  "hellose"
end

route("/test_site") do 
  "Tests"  
end

route("/") do 
  serve_static_file("welcome.jl.html")
end

function Extract_Game_And_Load_Into_Struct(game_dict)
    game = Game(
        game_dict["number_of_players"],
        game_dict["player_cards"],
        game_dict["shared_cards"][1] == 0 ? [0] : game_dict["shared_cards"][1:3],
        game_dict["shared_cards"][4],
        game_dict["shared_cards"][5],
        [0 0],
        collect(setdiff(1:52,   game_dict["player_cards"],
                                game_dict["shared_cards"][1:3],
                                game_dict["shared_cards"][4],
                                game_dict["shared_cards"][5])),
        game_dict["simulations"])
    return game
end

server = WebsocketServer()
listen(server, :client) do ws   
    listen(ws, :message) do message
        try
            game_dict = JSON.parse(message)
            game = Extract_Game_And_Load_Into_Struct(game_dict)
            probabilities = Simulate(game)
            probabilities_JSON = JSON.json(probabilities)
            send(ws, probabilities_JSON)
        catch err
            @info err          
            send(ws, "Could not run command")
        end
    end
end

function echo(val)
    return val
end

@async serve(server, 8081)


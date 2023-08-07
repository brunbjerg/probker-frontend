using Genie
using Genie.Router
using Genie.Renderer.Html
using SimpleWebsockets
using Pkg
Pkg.add(url="https://github.com/brunbjerg/Probker.jl")
using Probker
using JSON

print(@__LINE__)
route("/") do
    serve_static_file("probker.html")
end
print(@__LINE__)

function Extract_Game_And_Load_Into_Struct(game_dict)
    game = Game(
        game_dict["number_of_players"],
        [game_dict["player_cards"];
        game_dict["shared_cards"]],
        game_dict["folded_cards"],
        game_dict["simulations"])
        println(game)
    return game
end

print(@__LINE__)
server = WebsocketServer()
listen(server, :client) do ws
    listen(ws, :message) do message
        try
            game_dict = JSON.parse(message)
            game = Extract_Game_And_Load_Into_Struct(game_dict)
            probabilities = Simulate(game)
            probabilities_JSON = JSON.json(probabilities)
            println(probabilities_JSON)
            send(ws, probabilities_JSON)
        catch err
            println(@__LINE__)
            @info err
            send(ws, "Could not run command")
        end
    end
end
print(@__LINE__)

@async serve(server, 8082, "0.0.0.0")  
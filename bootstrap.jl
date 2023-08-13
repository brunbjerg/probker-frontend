(pwd() != @__DIR__) && cd(@__DIR__) # allow starting app from bin/ dir
using ProbkerApp
using SimpleWebsockets
using JSON
include("Probker.jl/src/Probker.jl")
using .Probker
# using Pkg
# Pkg.add(url="https://github.com/brunbjerg/Probker.jl")
# using Probker



# This will not work without the Probker package
function Extract_Game_And_Load_Into_Struct(game_dict)
    game = Game(
        game_dict["number_of_players"],
        [game_dict["player_cards"];
        game_dict["shared_cards"]],
        game_dict["folded_cards"],
        game_dict["simulations"])
    return game
end

server = WebsocketServer()
listen(server, :client) do ws
    listen(ws, :message) do message
        try
            # println(@__LINE__, message, "CHECKPOINT")
            game_dict = JSON.parse(message)
            # println(@__LINE__, game_dict, "CHECKPOINT")
            game = Extract_Game_And_Load_Into_Struct(game_dict)
            # println(@__LINE__, game, "CHECKPOINT")
            probabilities = Simulate(game)
            # println(@__LINE__, probabilities, "CHECKPOINT")
            probabilities_JSON = JSON.json(probabilities)
            # println(@__LINE__, probabilities_JSON, "CHECKPOINT")
            send(ws, probabilities_JSON)
        catch err
            println(@__LINE__, err, "CHECKPOINT")
            @info err
            # send(ws, "")
        end
    end
end
@async serve(server, 8082, "0.0.0.0")  
const UserApp = ProbkerApp

ProbkerApp.main()
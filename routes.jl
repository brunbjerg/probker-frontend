using Genie
using Genie.Router
using Genie.Renderer.Html

route("/") do
    serve_static_file("probker.html")
end



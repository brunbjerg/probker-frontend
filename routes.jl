using Genie
using Genie.Router

using .ProbkersController
using Probker
using Genie.Renderer.Html
route("/hello") do 
  "hellose"
end

route("/test_site") do 
  "Tests"  
end

route("/") do 
  serve_static_file("welcome.jl.html")
end


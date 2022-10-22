using Genie
using Genie.Router

using .ProbkersController
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


# #& 2 player
# route("/:np::/:p_1::Int64/:p_2::Int64/:p_3::Int64/:p_4::Int64/:f_1::Int64/:f_2::Int64/:f_3::Int64/:t::Int64/:r::Int64/:s::Int64") do
#   ProbkersController.Probker_Main(ProbkersController.game(2, [params(:p_1 ), params(:p_2), params(:p_3), params(:p_4)], 
#                                                              [params(:f_1), params(:f_2), params(:f_3)], 
#                                                               params(:t), 
#                                                               params(:r), 
#                                                               [0 0], 
#                                                               setdiff(collect(1:52),[params(:p_1), params(:p_2), params(:p_3), params(:p_4), params(:f_1), params(:f_2), params(:f_3), params(:t), params(:r)] ) , params(:s) ))
# end

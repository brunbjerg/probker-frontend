(pwd() != @__DIR__) && cd(@__DIR__) # allow starting app from bin/ dir

using ProbkerApp
const UserApp = ProbkerApp
ProbkerApp.main()

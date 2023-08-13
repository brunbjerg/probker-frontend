module ProbkerApp
  using Genie
  using Pkg
  # Pkg.add(url="https://github.com/brunbjerg/Probker.jl")
  #using Probker
  const up = Genie.up
  export up

  function main()
    Genie.genie(; context = @__MODULE__)
  end

end

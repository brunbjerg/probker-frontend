# pull latest julia image
FROM --platform=linux/amd64 julia:latest

# create dedicated user
RUN useradd --create-home --shell /bin/bash genie

# set up the app
RUN mkdir /home/genie/app
COPY . /home/genie/app
COPY ./Probker.jl /home/genie/.julia/dev/Probker.jl
WORKDIR /home/genie/app

# configure permissions
RUN chown -R genie:genie /home/

RUN chmod +x bin/repl
RUN chmod +x bin/server
RUN chmod +x bin/runtask

# switch user
USER genie

# instantiate Julia packages
RUN julia -e 'using Pkg; Pkg.activate("."); Pkg.instantiate()'
# RUN cp -r /home/genie/app/Probker.jl /home/genie/.julia/packages
# RUN julia -e "using Pkg; Pkg.activate(\".\") ; Pkg.develop(path=\"Probker.jl\") ; Pkg.instantiate() ; Pkg.precompile();"

# ports
EXPOSE 8081
EXPOSE 8082

# set up app environment
ENV JULIA_DEPOT_PATH "/home/genie/.julia"
ENV GENIE_ENV "dev"
ENV GENIE_HOST "0.0.0.0"
ENV PORT "8081"
# ENV WSPORT "8082"
ENV EARLYBIND "true"

# run app
CMD ["bin/server"]
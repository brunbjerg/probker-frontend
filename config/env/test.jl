using Genie, Logging

Genie.Configuration.config!(
  server_port                     = parse(Int,get(ENV, "PORT", "8080")),
  server_host                     = "127.0.0.1",
  log_level                       = Logging.Debug,
  log_to_file                     = true,
  server_handle_static_files      = true
)

ENV["JULIA_REVISE"] = "off"
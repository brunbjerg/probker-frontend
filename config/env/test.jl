using Genie, Logging

Genie.Configuration.config!(
  server_port                     = parse(Int,get(ENV, "PORT", "8081")),
  server_host                     = "0.0.0.0",
  log_level                       = Logging.Debug,
  log_to_file                     = true,
  server_handle_static_files      = true
)

ENV["JULIA_REVISE"] = "off"
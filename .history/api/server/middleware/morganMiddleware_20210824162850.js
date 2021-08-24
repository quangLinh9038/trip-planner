const morgan = require("morgan");
const chalk = require("chalk");

const morganMiddleware = morgan(function (tokens, req, res) {
  console.log(typeof tokens.method(req, res));

  var methodColor = tokens.method(req, res) === "GET" ? "34ace0" // blue
  : "FFB266" // orange
  : ""
  ;

  return [
    chalk.hex(methodColor).bold(tokens.method(req, res)),
    chalk.hex("#00CC66").bold(tokens.status(req, res)),
    chalk.hex("#ff5252").bold(tokens.url(req, res)),
    chalk.hex("#2ed573").bold(tokens["response-time"](req, res) + " ms"),
    chalk.hex("#f78fb3").bold("@ " + tokens.date(req, res)),
    chalk.yellow(tokens["remote-addr"](req, res)),
    chalk.hex("#fffa65").bold("from " + tokens.referrer(req, res)),
    chalk.hex("#1e90ff")(tokens["user-agent"](req, res)),
    "\n",
  ].join(" ");
});

module.exports = morganMiddleware;

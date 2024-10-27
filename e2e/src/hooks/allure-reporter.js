import { CucumberJSAllureFormatter, AllureRuntime } from "allure-cucumberjs";
import path from "path";

class Reporter extends CucumberJSAllureFormatter {
  constructor(options) {
    super(
      options,
      new AllureRuntime({
        resultsDir: path.resolve("./allure-results"),
      }),
      {
        exceptionFormatter: (message) => {
          return message
            .replace(/\x1b\[.*?m/g, '')  // Remove ANSI escape codes
            .replace(/[\u001b\u009b][[()#;?]*(?:(?:[a-zA-Z\d]*(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)?)?\u0007)/g, '')  // Remove other escape sequences
            .trim();
        },
        labels: [
          {
            pattern: [/@feature:(.*)/],
            name: "epic",
          },
          {
            pattern: [/@severity:(.*)/],
            name: "severity",
          },
        ],
        links: [
          {
            pattern: [/@issue=(.*)/],
            type: "issue",
            urlTemplate: "http://localhost:8080/issue/%s",
          },
          {
            pattern: [/@tms=(.*)/],
            type: "tms",
            urlTemplate: "http://localhost:8080/tms/%s",
          },
        ],
      }
    );
  }

  onTestFail(test, error) {
    const formattedMessage = this.formatErrorMessage(error.message || error.toString());
    test.addLabel('error', formattedMessage);
    if (error.stack) {
      test.addAttachment('Stack Trace', 'text/plain', error.stack);
    }
    super.onTestFail(test, error);
  }

  formatErrorMessage(message) {
    return message
      .replace(/\x1b\[.*?m/g, '')  // Remove ANSI escape codes
      .replace(/[\u001b\u009b][[()#;?]*(?:(?:[a-zA-Z\d]*(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)?)?\u0007)/g, '')  // Remove other escape sequences
      .trim();
  }
}

export default Reporter;

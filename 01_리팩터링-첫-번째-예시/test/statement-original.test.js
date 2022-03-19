const invoices = require("../src/data/invocies.json");
const plays = require("../src/data/plays.json");
import { statement } from "../src/statement-original";
import result from "./test-result.js";

describe("[before start refactoring ver] check refactoring result", () => {
  test("statement test result", () => {
    const statementResult = statement(invoices, plays);
    expect(statementResult).toBe(result);
  });
});

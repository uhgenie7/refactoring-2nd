const invoices = require("../src/data/invocies.json");
const plays = require("../src/data/plays.json");
import { statement } from "../src/1-8-statement.js";
import result from "./test-result.js";

describe("[Chpate1.8ver] check refactoring result", () => {
  test("statement test result", () => {
    const statementResult = statement(invoices, plays);
    expect(statementResult).toBe(result);
  });
});

import ariphmProgrSum from "./ariphmProgrSum";

test("ariphm sum to equal 104", () => {
  expect(ariphmProgrSum(12, 8, 4)).toBe(104);
});

/*
* Note: babel-jest is automatically installed when installing Jest 
* and will automatically transform files if a babel configuration exists in your project.
*/
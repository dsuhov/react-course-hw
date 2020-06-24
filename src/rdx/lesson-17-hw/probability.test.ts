import { probablity, ActionProb } from "./probability";

it("Probability Middleware test", () => {
  const sampleProbablity = 0.2;

  const someAction: ActionProb = {
    type: "DO_SMTH",
    payload: {
      probablity: sampleProbablity,
    },
  };

  const nextFn = jest.fn();
  const mWare = (probablity as any)()(nextFn as any);

  const maxCount = 10000;

  for (let i = 0; i < maxCount; i++) {
    mWare(someAction);
  }

  const ratio = nextFn.mock.calls.length / maxCount;

  expect(ratio).toBeCloseTo(sampleProbablity, 1);
});

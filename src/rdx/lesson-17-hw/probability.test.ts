import { probablity, ActionProb } from "./probability";

describe("Probability Middleware test", () => {
  it("", () => {
    const sampleProbablity = 0.2;

    const someAction: ActionProb = {
      type: "DO_SMTH",
      payload: {
        probablity: sampleProbablity,
      },
    };

    const nextFn = jest.fn();
    const mWare = probablity()(nextFn);

    const maxCount = 1000;

    for (let i = 0; i < maxCount; i++) {
      mWare(someAction);
    }

    const ratio = nextFn.mock.calls.length / maxCount;

    expect(ratio).toBeCloseTo(sampleProbablity);
  });
});

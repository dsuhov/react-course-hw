export class Ticker {
  private trigger: () => void;

  constructor(trigger: () => void) {
    this.trigger = trigger;
  }

  public start() {
    this.trigger();
  }

  public stop() {
    return;
  }

  public getSpeed() {
    return 200;
  }
}

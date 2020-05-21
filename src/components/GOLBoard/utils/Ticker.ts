export class Ticker {
  private trigger: () => void;
  private intId = 0;
  private interval = 0;

  constructor(trigger: () => void, initSpeed: number) {
    this.trigger = trigger;
    this.interval = initSpeed;
  }

  public start(interval: number | void) {
    if (this.intId) {
      window.clearInterval(this.intId);
    }

    if (interval) {
      this.interval = interval;
    }

    this.intId = window.setInterval(() => {
      this.trigger();
    }, this.interval);
  }

  public stop() {
    window.clearInterval(this.intId);
    this.intId = 0;
  }

  public getSpeed() {
    return this.interval;
  }
}

export class Ticker {
  private trigger: () => void;
  private intId = 0;
  private interval = 200;

  constructor(trigger: () => void) {
    this.trigger = trigger;
  }

  public start() {
    if (this.intId) {
      window.clearInterval(this.intId);
    }

    this.intId = window.setInterval(() => {
      this.trigger();
    }, this.interval);
  }

  public stop() {
    if (!this.intId) {
      return;
    }

    window.clearInterval(this.intId);
    this.intId = 0;
  }

  public getSpeed() {
    return this.interval;
  }

  public setSpeed(interval: number) {
    this.interval = interval;
  }

  public setFaster() {
    this.stop();
    const newInt = this.interval - 100;

    if (newInt < 200) {
      this.start();
      return;
    }
    this.interval = newInt;
    this.start();
  }

  public setSlower() {
    this.stop();
    this.interval = this.interval + 200;
    this.start();
  }
}

export class Ticker {
  private trigger: () => void;
  private intId = 0;

  constructor(trigger: () => void) {
    this.trigger = trigger;
  }

  public start(interval: number) {
    if (this.intId) {
      window.clearInterval(this.intId);
    }

    this.intId = window.setInterval(() => {
      this.trigger();
    }, interval);
  }

  public stop() {
    window.clearInterval(this.intId);
  }
}

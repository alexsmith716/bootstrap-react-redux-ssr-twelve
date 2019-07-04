
// accessor properties: getters and setters

class TimeElapsed {

  constructor() {}
  // constructor(startTime) {
  //   this._startTime = startTime;
  // }

  set startTime(startTime) {
    this._startTime = startTime;
  }

  get startTime() {
    return this._startTime;
  }

  // -----------------------------

  get secondsElapsed() {
    return (Date.now() - this.startTime) / 1000;
  }

  secondsElapsedX(elapsed) {
    return (elapsed - this.startTime) / 1000;
  }

}

export default new TimeElapsed();

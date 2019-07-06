
// accessor properties: getters and setters

class TimeElapsedClass {

  // constructor() {}
  constructor() {
    this._startTime = 0;
  }

  setStartTime() {
    this._startTime = Date.now();
  }

  getStartTime() {
    return this._startTime;
  }

  getSecondsElapsed() {
    return (Date.now() - this._startTime) / 1000;
  }
}

export default new TimeElapsedClass();

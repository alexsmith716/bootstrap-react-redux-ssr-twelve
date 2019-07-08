
// 'this': placeholder for a specific instance
// 'this': (will be known by the time the method is invoked)

// dynamic properties are called accessor properties

const data = new WeakMap();

const timeElapsedClass = class {

  // initialize instance
  constructor() {
    // this._startTime = Date.now();
    data.set(this, {
      startTime: 0
    });
  }

  // instance methods -----------------------
  setStartTime() {
    // this._startTime = Date.now();
    data.get(this).startTime = Date.now();
  }

  getStartTime() {
    // return this._startTime;
    return data.get(this).startTime;
  }

  getSecondsElapsed() {
    return (Date.now() - data.get(this).startTime) / 1000;
  }
}

export default timeElapsedClass;

/**
 * Returns the next (fake) temperature given the last one and current trend
 * @constructor
 * @param {number} previous - The previous temperature
 * @param {number} direction - 1 if the temperature currently rising, -1 if falling 
 */
let nextTemp = function(previous, direction) {
    let change = Math.random() * 100;
    let directionChange = 0;
  
    if (
      (previous < -1000 && direction === -1) ||
      (previous > 4000 && direction === 1)
    ) {
      directionChange = Math.random() < 0.3 ? -1 : 1;
    } else {
      directionChange = Math.random() < 0.1 ? -1 : 1;
    }
  
    direction = direction * directionChange;
    return Math.floor(previous + direction * change);
  }

/**
 * Returns a list of random measurements
 */
let randomSeries = function() {
  let values = []
  let startTime = new Date();
  startTime.setMinutes(startTime.getMinutes() - 18 );

  let temp = 2000;
  let direction = 1;
  for (let i=0; i<200; i++) {
    // Timestamp
    let newDate = new Date(startTime.valueOf());
    const secondsToAdd = i * 5;
    newDate.setSeconds(newDate.getSeconds() + secondsToAdd);
    newDate.setMilliseconds(newDate.getMilliseconds() - Math.random() * 1000)

    // Temperature
    let newTemp = nextTemp(temp, direction);
    direction = newTemp > temp ? 1 : -1;
    temp = newTemp

    // Append to front
    values = [...values, {x: newDate, y: newTemp}]
  }
  return values;
}

export {
    nextTemp,
    randomSeries
}
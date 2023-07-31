/*
// data [0-12]
[
  { "x": 0, "y": 0 },
  { "x": 1, "y": 0.6666666666666666 },
  { "x": 2, "y": 1.3333333333333333 },
  { "x": 3, "y": 2 },
  { "x": 4, "y": 2.6666666666666665 },
  { "x": 5, "y": 3.3333333333333335 },
  { "x": 6, "y": 4 },
  { "x": 7, "y": 4.333333333333334 },
  { "x": 8, "y": 4.666666666666666 },
  { "x": 9, "y": 5 },
  { "x": 10, "y": 5.333333333333334 },
  { "x": 11, "y": 5.666666666666666 },
  { "x": 12, "y": 6 }
]
*/

let data = [...Array(13).keys()].map((_, i) => i)

let fakeData = [
  { "x": 0, "y": null },
  { "x": 1, "y": null },
  { "x": 2, "y": null },
  { "x": 3, "y": null },
  { "x": 4, "y": null },
  { "x": 5, "y": null },
  { "x": 6, "y": null },
  { "x": 7, "y": null },
  { "x": 8, "y": null },
  { "x": 9, "y": null },
  { "x": 10, "y": null },
  { "x": 11, "y": null },
  { "x": 12, "y": null }
]

let scale = (input) => {
  if (input > 6) {
    return ((input / 3) + 2)
  } else {
    return (input / 1.5)
  }
}

/**
 * Slope
 * Formula: m = (y2 - y1) / (x2 - x1) = (deltaY / deltaX)
 * point1 {Object} - The lower point on the graph
 * point2 {Object} - The higher point on the graph
 * return scalar or 'undefined'
*/
let slope = (point1, point2) => {
  if (point2.x - point1.x === 0) {
    return 'undefined'
  }
  return (point2.y - point1.y) / (point2.x - point1.x)
}

let result = data.map(i => ({
    x: i,
    y: scale(i) + 0.00001
  })
)

let result2 = fakeData.map(i => ({
    x: i.x,
    y: scale(i.x) + 0.00001
  })
)

console.log('result: ', result)
console.log('result2: ', result2)


let resultSlope1 = slope(result[0], result[7])
let resultSlope2 = slope(result[8], result[12])

let result2Slope1 = slope(result2[0], result2[7])
let result2Slope2 = slope(result2[8], result2[12])

console.log(`result slope 1: ${resultSlope1}`)
console.log(`result slope 2: ${resultSlope2}`)

console.log(`result2 slope 1: ${result2Slope1}`)
console.log(`result2 slope 2: ${result2Slope2}`)

const myChart = new Chart("myChart", {
  type: "scatter",
  data: {
    datasets: [{
      label: 'Result',
      pointRadius: 4,
      pointBackgroundColor: "rgba(255,0,0,1)",
      data: result.map((obj, i) => ({ x: i, y: obj.y }))
    },{
      label: 'Result2',
      pointRadius: 4,
      pointBackgroundColor: "rgba(0,0,255,1)",
      data: result2.map((obj, i) => ({ x: i, y: obj.y }))
    }]
  },
  options:{
    scales: {
	  x: {
	    type: 'linear',
		position: 'bottom'
	  },
      y: {
        beginAtZero: true
      }
    }
  }
})

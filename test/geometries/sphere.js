"use strict"

module.exports = sphere

function sphere(i, numInside, numBoundary) {
  var boundary = []
  var hull = []
  for(var j=0; j<numBoundary; ++j) {
    var x = new Array(i)
    var d2 = 0.0
    for(var k=0; k<i; ++k) {
      var v = 2*Math.random() - 1.0
      x[k] = v
      d2 += v * v
    }
    var recip = 1.0 / Math.sqrt(d2)
    for(var k=0; k<i; ++k) {
      x[k] *= recip
    }
    boundary.push(x)
    hull.push(j)
  }
  for(var j=0; j<numInside; ++j) {
    var x = new Array(i)
    for(var k=0; k<i; ++k) {
      var v = 0.5 * (Math.random() - 0.5)
      x[k] = v
    }
    boundary.push(x)
  }
  return {
    points: boundary,
    hull: hull
  }     
}
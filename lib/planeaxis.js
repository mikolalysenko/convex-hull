"use strict"

var solve = require("robust-linear-solve")

module.exports = planeAxis

function planeAxis(d, plane) {
  var m = new Array(d)
  var b = new Array(d)
  for(var i=0; i<d; ++i) {
    var c = new Array(d)
    for(var j=0; j<d; ++j) {
      c[j] = plane[i][j]
    }
    m[i] = c
    b[i] = 1
  }
  var x = solve(m, b)
  if((d % 4 === 0) || (d % 4 === 3)) {
    for(var i=0; i<d; ++i) {
      var y = x[i]
      for(var j=0; j<y.length; ++j) {
        y[j] = -y[j]
      }
    }
  }
  return x
}
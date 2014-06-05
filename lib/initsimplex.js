"use strict"

var orient = require("robust-orientation")
var sum = require("two-sum")
var extrema = require("./extrema")

module.exports = initialBoundary

function vecDiff(d, x, y) {
  var r = new Array(d)
  for(var i=0; i<d; ++i) {
    r[i] = sum(x[i], -y[i])
  }
  return r
}

function isZero(vec) {
  for(var i=0; i<vec.length; ++i) {
    var v = vec[i]
    if(v[v.length-1] !== 0) {
      return false
    }
  }
  return true
}

//Find a tuple of up to d points on the boundary of the set.
//This is actually the hardest part of quickhull
function initialBoundary(points) {

  //Bug:  This algorithm takes up to quadratic time for point sets which are not in general position

  var n = points.length
  if(n <= 0) {
    return []
  }
  if(n === 1) {
    return [0]
  }
  var d = points[0].point.length
  var boundaryPoints = []
  var lastPoint = 0

  //Initialize random frame
  var currentFrame = new Array(d+1)
  for(var i=0; i<=d; ++i) {
    var x = new Array(d)
    for(var j=0; j<d; ++j) {
      x[j] = 2*(Math.random() - 0.5)
    }
    currentFrame[i] = x
  }

outerLoop:
  for(var i=0; i<=d; ++i) {
    for(var j=0; j<n; ++j) {
      if(boundaryPoints.indexOf(j) >= 0) {
        continue
      }
      var dir = vecDiff(d, points[j].point, points[lastPoint].point)
      if(isZero(dir)) {
        continue
      }
      var farthest = extrema(d, points, dir)
      var p = points[farthest].point
      currentFrame[i] = p
      if(orient.apply(void 0, currentFrame) === 0) {
        continue
      }
      lastPoint = farthest
      boundaryPoints.push(farthest)
      continue outerLoop
    }
    //No solution
    break
  }

  //Return point set
  return boundaryPoints
}
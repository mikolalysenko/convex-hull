"use strict"

var zipIndex = require("./indexpoint")
var extrema = require("./extrema")
var partition = require("./partition")
var initBoundary = require("./initsimplex")
var planeAxis = require("./planeaxis")
var flip = require("./flip")

module.exports = convexHullnd

//Recursive quickhull procedure call
function convexHullRec(d, list, points, plane) {
  //Find plane axis
  var axis = planeAxis(d, plane)

  //Find extremal point x
  var x_idx = extrema(d, points, axis)
  var x = points[x_idx]

/*
  if(x.index >= 200) {
    console.log("Adding bogus point: x=", x, "axis=", axis, "plane=", plane, "pts=", points)
  }
  */
  var xp = x.point
  list.push(x.index)
  points.splice(x_idx, 1)

  //Split into subplanes
  for(var i=0; i<d; ++i) {
    var pl = plane.slice()
    pl[i] = xp

    var parts = partition(d, points, pl)
    var neg = parts[0]
    var pos = parts[1]
    points = neg
    if(pos.length > 0) {
      convexHullRec(d, list, pos, pl)
    }
    if(neg.length <= 0) {
      break
    }
  }
}

function compareInt(a,b) {
  return a-b
}

//Find the convex hull of all points
function convexHullnd(d, points) {
  var indexed = zipIndex(points)

  var n = indexed.length
  if(n === 1) {
    return [ indexed[0].index ]
  }

  //Compute initial boundary
  var startBoundary = initBoundary(indexed)
  var initPlane = new Array(d)
  var list = []
  startBoundary.sort(compareInt)
  for(var i=startBoundary.length-2; i>=0; --i) {
    var idx = startBoundary[i]
    var p = indexed[idx]
    list.push(p.index)
    initPlane[i] = p.point
    indexed.splice(idx, 1)
  }

  //For degenerate configurations add extra points
  for(var i=startBoundary.length-1; i<d; ++i) {
    var x = new Array(d)
    for(var j=0; j<d; ++j) {
      x[j] = 2*Math.random() - 1.0
    }
    initPlane[i] = x
  }

  //Form initial partition, and use this to select new point list
  var parts = partition(d, indexed, initPlane)
  var neg = parts[0]
  var pos = parts[1]

  if(pos.length > 0) {
    convexHullRec(d, list, pos, initPlane) 
  }
  if(neg.length > 0) {
    convexHullRec(d, list, neg, flip(initPlane))
  }

  //Return the final list of boundary points
  list.sort(compareInt)
  return list
}
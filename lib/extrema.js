"use strict"

var scale = require("robust-scale")
var sum = require("robust-sum")
var compress = require("robust-compress")
var cmp = require("robust-compare")

module.exports = extrema

function dot(d, axis, point) {
  var s = [0]
  for(var i=0; i<d; ++i) {
    s = sum(s, scale(axis[i], point[i]))
  }
  return s
}

function lexicographicCompare(d, a, b) {
  for(var i=0; i<d; ++i) {
    var x = a[i]
    var y = b[i]
    var s = x - y
    if(s) {
      return s
    }
  }
  return 0
}

//Find farthest point along axis
function extrema(d, points, axis) {
  var n = points.length
  var hi = 0
  var hiv = compress(dot(d, axis, points[0].point))
  for(var i=1; i<n; ++i) {
    var p = points[i].point
    var v = dot(d, axis, p)
    var s = cmp(v, hiv)
    if(s > 0) {
      hi = i
      hiv = compress(v)
    } else if(s === 0) {
      //Compare points lexicographic order if along same axis
      if(lexicographicCompare(d, p, points[hi].point) < 0) {
        hi = i
      }
    }
  }
  return hi
}
"use strict"

var uniq = require("uniq")

module.exports = indexPoints

function IndexPoint(p, i) {
  this.point = p
  this.index = i
}

function compareIndexedPoints(a, b) {
  var pa = a.point
  var pb = b.point
  var d = pa.length
  for(var i=0; i<d; ++i) {
    var s = pa[i] - pb[i]
    if(s) {
      return s
    }
  }
  return 0
}

function indexPoints(points) {
  //Zip points with index
  var n = points.length
  var indexed = new Array(n)
  for(var i=0; i<n; ++i) {
    indexed[i] = new IndexPoint(points[i], i)
  }

  //Removed duplicate points
  uniq(indexed, compareIndexedPoints)

  return indexed
}
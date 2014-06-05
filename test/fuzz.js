"use strict"

var tape = require("tape")
var pis = require("robust-point-in-simplex")
var ch = require("../ch.js")
var foreachCombination = require("foreach-combination")

var TEST_DIMENSIONS = [2,3,4]

//Brute force test
function insideHull(points, index, p) {
  var d = p.length
  var r = foreachCombination(index, d+1, function() {
    var simplex = new Array(d+1)
    for(var i=0; i<d+1; ++i) {
      simplex[i] = points[arguments[i]]
    }
    if(pis(simplex, p) >= 0) {
      return true
    }
  })
  return !!r
}

function verifyHull(t, points) {
  var hull = ch(points)
  
  //Invariant 1: Every point of points is a convex combination of points in hull
  for(var i=0; i<points.length; ++i) {
    t.ok(insideHull(points, hull, points[i]), "check point [" + points[i].join() + "] in hull")
  }

  //Invariant 2: No point in hull is a convex combination of any subset of hull not containing that point
  for(var i=0; i<hull.length; ++i) {
    var thull = hull.slice()
    thull.splice(i, 1)
    t.ok(!insideHull(points, thull, points[hull[i]]), "check point [" + points[hull[i]].join() + "] on hull")
  }
}

TEST_DIMENSIONS.map(function(d) {
  [5,10,20].map(function(n) {
    tape("fuzz-test d=" + d + " n=" + n, function(t) {
      var points = new Array(n)
      for(var i=0; i<n; ++i) {
        points[i] = new Array(d)
        for(var j=0; j<d; ++j) {
          points[i][j] = (Math.random()-0.5) * Math.pow(2, 80*Math.random()-40)
        }
      }
      verifyHull(t, points)
      t.end()
    })
  })
})
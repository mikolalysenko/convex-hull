"use strict"

var tape = require("tape")
var uniq  = require("uniq")
var findBoundary = require("../lib/initsimplex")
var zipIndex = require("../lib/indexpoint")
var sphere = require("./geometries/sphere")
var hypercube = require("./geometries/cube")

function lift(points) {
  return points.map(function(p) {
    var r = p.slice()
    r.push(0)
    return r
  })
}

tape("test initial boundary", function(t) {

  function verifyBoundary(points, hull, dimension) {
    var zipped = zipIndex(points)
    var initSimplex = findBoundary(zipped)

    t.equals(initSimplex.length, dimension+1, "check dimension consistent")
    for(var i=0; i<initSimplex.length; ++i) {
      var idx = zipped[initSimplex[i]].index
      t.ok(hull.indexOf(idx) >= 0, "check point [" + points[idx] + "] on hull")
    }

    var prevLength = initSimplex.length
    uniq(initSimplex)
    t.equals(initSimplex.length, prevLength, "check no duplicates")
  }

  verifyBoundary([
    [0,0],
    [1,0],
    [2,0],
    [0,1],
    [0,2],
    [1,1],
    [2,2],
    [0.5,0.5],
    [0.25,0.25]
  ], [0, 2, 4, 6], 2)
  
  var circle = []
  var hull = []

  for(var i=0; i<10; ++i) {
    var theta = i / 5.0 * Math.PI
    circle.push([ Math.cos(i), Math.sin(i) ])
    hull.push(i)
  }
  for(var i=0; i<100; ++i) {
    circle.push([Math.random()-0.5, Math.random()-0.5])
  }
  verifyBoundary(circle, hull, 2)

  //Test points on hypercube
  for(var i=2; i<=5; ++i) {
    var cube = hypercube(i, 4)
    verifyBoundary(cube.points, cube.hull, i)
  }

  //Test points on sphere
  for(var i=2; i<=4; ++i) {
    for(var count=0; count<10; ++count) {
      var si = sphere(i, 200, 200)
      verifyBoundary(si.points, si.hull, i)
      verifyBoundary(lift(si.points), si.hull, i)
    }
  }


  t.end()
})
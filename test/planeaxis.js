"use strict"

var tape = require("tape")
var orient = require("robust-orientation")
var planeAxis = require("../lib/planeaxis")
var flip = require("../lib/flip")

tape("plane axis", function(t) {

  for(var d=2; d<=8; ++d) {
    var points = new Array(d+1)
    for(var i=0; i<=d; ++i) {
      var x = new Array(d)
      for(var j=0; j<d; ++j) {
        x[j] = 0
      }
      if(i < d) {
        x[i] = 1
      }
      points[i] = x
    }
    for(var i=0; i<d; ++i) {
      var subplane = points.filter(function(pl) {
        return !pl[i]
      })
      var otuple = subplane.slice()
      otuple.push(points[i])
      var sgn = orient.apply(void 0, otuple)
      for(var f=0; f<2; ++f) {
        var target = new Array(d+1)
        for(var j=0; j<=d; ++j) {
          if(j === i) {
            if(sgn < 0) {
              target[j] = [ -1 ]
            } else {
              target[j] = [ 1 ]
            }
          } else {
            target[j] = [ 0 ]
          }
        }
        t.same(planeAxis(d, subplane), target)
        flip(subplane)
        sgn = -sgn
      }
    }
  }

  t.end()
})
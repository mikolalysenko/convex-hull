"use strict"

var tape = require("tape")
var sphere = require("./geometries/sphere")
var ch = require("../ch.js")

;[2, 3, 4, 5].map(function(d) {
  tape("sphere test for d=" + d, function(t) {
    for(var i=0; i<10; ++i) {
      var s = sphere(d, 10, 50)
      var hull = ch(s.points)
      console.log(hull.slice(200).map(function(idx) {
        return s.points[idx]
      }))
      t.same(hull, s.hull)
    }
    t.end()
  })
})
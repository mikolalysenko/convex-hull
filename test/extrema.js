"use strict"

var extrema = require("../lib/extrema")
var index = require("../lib/indexpoint")
var tape = require("tape")

//TODO: Test this further

tape("extrema", function(t) {

  var points = index([
    [0,0],
    [1,0],
    [1,1],
    [0,1],
    [0.5,0,5],
    [2,2]
  ])
  
  t.equals(points[extrema(2, points, [
      [1],
      [0]
    ])].index, 5)

  t.equals(points[extrema(2, points, [
      [-1],
      [0],
    ])].index, 0)

  t.equals(points[extrema(2, points, [
      [1],
      [-1]
    ])].index, 1)

  t.end()
})
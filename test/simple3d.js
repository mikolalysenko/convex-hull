"use strict"

var tape = require("tape")
var ch = require("../ch")

tape("simple 3d tests", function(t) {

  var icos =  [ [0,0,1.176],            [1.051,0,0.526],
                [0.324,1.,0.525],       [-0.851,0.618,0.526],
                [-0.851,-0.618,0.526],  [0.325,-1.,0.526],
                [0.851,0.618,-0.526],   [0.851,-0.618,-0.526],
                [-0.325,1.,-0.526],     [-1.051,0,-0.526],
                [-0.325,-1.,-0.526],    [0,0,-1.176] ]
  var hull = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  t.same(ch(icos), hull)

  //Add a few junk points in interior
  for(var i=0; i<10; ++i) {
    icos.push([ 0.5*(Math.random()-.5), 
                0.5*(Math.random()-.5),
                0.5*(Math.random()-.5) ])
  }
  t.same(ch(icos), hull)


  t.end()
})
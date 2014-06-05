"use strict"

var tape = require("tape")
var ch = require("../ch")

tape("selected examples", function(t) {
  
  for(var count=0; count<10; ++count) {

    //Create a sphere
    var points = []
    var list = []
    for(var i=0; i<10; ++i) {
      var theta = i / 5 * Math.PI
      points.push([Math.cos(theta), Math.sin(theta)])
      list.push(i)
    }
    points.push([0,0], [0.1,0.1],[-0.1,-0.1])
    t.same(ch(points), list, "2d")

    t.same(ch([
        [0,0,0,0],
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [0,0,0,1],
        [0.01,0.01,0.01,0.01]
      ]), [0,1,2,3,4])

    t.same(ch([[0,0], [1,0], [0,1], [0.25,0.25]]), [0,1,2], "simple 2d")

    t.same(ch([]), [], "empty list")
    t.same(ch([[],[],[]]), [], "0d list")
    t.same(ch([[0], [0], [0], [0]]), [0], "0d list with duplicates")
    t.same(ch([[-1], [2], [0.1], [0.3]]), [0,1], "0d list")

    //Test simplices
    for(var i=2; i<5; ++i) {
      var list = []
      var expected = []
      for(var j=-1; j<i; ++j) {
        var p = new Array(i)
        for(var k=0; k<i; ++k) {
          if(j === k) {
            p[k] = 1
          } else {
            p[k] = 0
          }
        }
        list.push(p)
        expected.push(j+1)
        t.same(ch(list), expected, (j+1) + " simplex in " + i + "d")
      }
      var p = new Array(i) 
      for(var j=0; j<i; ++j) {
        p[j] = 0.1
      }
      list.push(p)
      t.same(ch(list), expected, "simple hull")
    }

    //Test some degenerate configurations
    t.same(ch([[0,0], [0.5,0], [1,0]]), [0,1,2], "collinear points in 2d")
    t.same(ch([[0,0,0], [0.5,0,0], [1,0,0]]), [0,1,2], "collinear points in 3d")
    t.same(ch([[0,0,0], [1,0,0], [0,1,0], [0.5,0.5,0]]), [0,1,2,3], "coplanar points in 3d")
  }

  t.end()
})

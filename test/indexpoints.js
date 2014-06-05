"use strict"

var doIndex = require("../lib/indexpoint.js")
var tape = require("tape")

tape("index points", function(t) {

  var points = [[1,1,2], [2,1,1], [1,1,2], [0,1,2]]
  var indexed = doIndex(points)

  t.same(indexed, [
      { index: 3,
        point: [0,1,2]
      },
      { index: 0,
        point: [1,1,2],
      },
      { index: 1,
        point: [2,1,1]
      }
    ])

  t.end()
})
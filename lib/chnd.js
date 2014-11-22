'use strict'

module.exports = convexHullnD

var ich = require('incremental-convex-hull')

function convexHullnD(points) {
  //TODO: handle degenerate cases
  return ich(points, true)
}
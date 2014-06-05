"use strict"

module.exports = flip

function flip(simplex) {
  var tmp = simplex[0]
  simplex[0] = simplex[1]
  simplex[1] = tmp
  return simplex
}
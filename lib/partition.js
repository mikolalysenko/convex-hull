"use strict"

var orient = require("robust-orientation")

module.exports = partition

//Partition points by halfspace determined by plane into positive and negatively oriented sets
function partition(d, points, plane) {
  var nplane = plane.slice()
  nplane.push(plane[0])
  var neg = []
  var pos = []
  for(var i=0, n=points.length; i<n; ++i) {
    var p = points[i]
    nplane[d] = p.point
    var o = orient.apply(void 0, nplane)
    if(o >= 0) {
      pos.push(p)
    } else {
      neg.push(p)
    }
  }
  return [neg, pos]
}

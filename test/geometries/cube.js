"use strict"

module.exports = hypercube

function isZeroOne(p) {
  for(var i=0; i<p.length; ++i) {
    if(!(p[i] === 0 || p[i] === 1)) {
      return false
    }
  }
  return true
}

function hypercube(d, numSubdiv) {
  var points = new Array(numSubdiv+2)
  points[0] = 0.0
  for(var i=1; i<=numSubdiv; ++i) {
    var x = i / (numSubdiv+1)
    points[i] = x
  }
  points[numSubdiv+1] = 1.0
  
  function cartesian(a, b) {
    var result = []
    for(var i=0; i<a.length; ++i) {
      for(var j=0; j<b.length; ++j) {
        var x = a[i].slice()
        x.push(b[j])
        result.push(x)
      }
    }
    return result
  }

  var npoints = points.map(function(p) {
    return [p]
  })
  for(var i=1; i<d; ++i) {
    npoints = cartesian(npoints, points)
  }

  var hull = []
  for(var i=0; i<npoints.length; ++i) {
    if(isZeroOne(npoints[i])) {
      hull.push(i)
    }
  }

  return {
    points: npoints,
    hull: hull
  }
}
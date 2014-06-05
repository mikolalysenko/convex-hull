robust-convex-hull
==================
Given a list of points in any dimension, find a minimal generating subset for the convex hull of the points.

# Example

```javascript
var ch = require("robust-convex-hull")

var points = [
  [0,0],
  [1,0],
  [0,1],
  [0.15,0.15],
  [0.5, 0.5]
]


//Picture:
//
// [0,1] *
//       |\
//       | \
//       |  \
//       |   \
//       |    \
//       |     \
//       |      \
//       |       * [0.5,0.5]
//       |        \
//       |         \
//       |          \
//       |           \
//       |            \
//       |    *        \
//       | [0.15,0.15]  \
// [0,0] *---------------* [1,0]
//

console.log(ch(points))
```

Output:

```javascript
[0, 1, 2]
```

# Install

```
npm install robust-convex-hull
```

If you want to use it in a webpage, use [browserify](http://browserify.org).

# API

#### `require("robust-convex-hull")(points)`
Find a minimal generating subset for the convex hull of a set of points.

* `points` is an array of points encoded as `d` length arrays

**Returns** A collection of indices representing the subset of `points` which generate the convex hull of the point set.  This list will be sorted in ascending order.

**Time complexity** For points in general position, the procedure should take O(n log(n)).  If there are more d coplanar points in the set, then the algorithm might take O(n^2) instead.  This is currently due to a limitation in the way the initial simplex is calculated, and any pull requests fixing this issue are welcome.

# Credits
(c) 2014 Mikola Lysenko. MIT License
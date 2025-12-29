class Point {
  constructor(x, y, userData) {
    this.x = x;
    this.y = y;
    this.userData = userData;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x; // Center x
    this.y = y; // Center y
    this.w = w; // Half width
    this.h = h; // Half height
  }

  contains(point) {
    return (
      point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h
    );
  }

  intersects(range) {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h
    );
  }
}

class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    return (
      this.northeast.insert(point) ||
      this.northwest.insert(point) ||
      this.southeast.insert(point) ||
      this.southwest.insert(point)
    );
  }

  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;

    let ne = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    this.northeast = new QuadTree(ne, this.capacity);
    let nw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    this.northwest = new QuadTree(nw, this.capacity);
    let se = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    this.southeast = new QuadTree(se, this.capacity);
    let sw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    this.southwest = new QuadTree(sw, this.capacity);

    this.divided = true;
  }

  query(range, found) {
    if (!found) {
      found = [];
    }

    if (!this.boundary.intersects(range)) {
      return found;
    }

    for (let p of this.points) {
      if (range.contains(p)) {
        found.push(p);
      }
    }

    if (this.divided) {
      this.northwest.query(range, found);
      this.northeast.query(range, found);
      this.southwest.query(range, found);
      this.southeast.query(range, found);
    }

    return found;
  }

  // Find nearest point to a given x, y
  findNearest(x, y) {
      let bestPoint = null;
      let bestDist = Infinity;

      // Recursive helper
      const search = (node) => {
          // If this node boundary is further than bestDist, skip it (pruning)
          // Simple dist check to rectangle: calculate min distance from (x,y) to rectangle
          // If min distance > bestDist, we don't need to search this node
          // Check if point is inside, intersecting, or close enough
          
          let distToBoundary = 0;
            // logic to calculate distance to boundary
            let dx = Math.max(Math.abs(x - node.boundary.x) - node.boundary.w, 0);
            let dy = Math.max(Math.abs(y - node.boundary.y) - node.boundary.h, 0);
            distToBoundary = Math.sqrt(dx * dx + dy * dy);

          if (distToBoundary > bestDist) {
              return;
          }

          for (let p of node.points) {
              let d = Math.sqrt(Math.pow(x - p.x, 2) + Math.pow(y - p.y, 2));
              if (d < bestDist) {
                  bestDist = d;
                  bestPoint = p;
              }
          }

          if (node.divided) {
             // Heuristic: search children closest to the point first
             // Simply searching all for now, relying on pruning via bestDist
              search(node.northeast);
              search(node.northwest);
              search(node.southeast);
              search(node.southwest);
          }
      };
      
      search(this);
      return bestPoint;
  }
}

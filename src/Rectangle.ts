import { Vec2 } from './Vec2';

export class Rectangle {
  public left: number;
  public top: number;
  public width: number;
  public height: number;
  public radians: number;

  constructor (x: number, y: number, w: number, h: number, radians = 0) {
    this.left = x;
    this.top = y;
    this.width = w;
    this.height = h;
    this.radians = radians;
  }

  public get right (): number { return this.left + this.width; }

  public get bottom (): number { return this.top + this.height; }

  public get points (): Array<Vec2> {
    const { left, right, top, bottom, width, height, radians } = this;
    const origin = new Vec2(left + width / 2, top + height / 2);
    const p1 = new Vec2(left, top);
    const p2 = new Vec2(right, top);
    const p3 = new Vec2(right, bottom);
    const p4 = new Vec2(left, bottom);

    return [
      p1.rotate(origin, radians),
      p2.rotate(origin, radians),
      p3.rotate(origin, radians),
      p4.rotate(origin, radians)
    ];
  }

  public get area (): number {
    return this.width * this.height;
  }

  /**
   * returns un-rotated rectangle that contains all points of this rectangle when rotated.
   */
  public get boundingBox (): Rectangle {
    const points = this.points;
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    const top = Math.min(...ys);
    const left = Math.min(...xs);
    const bottom = Math.max(...ys);
    const right = Math.max(...xs);
    const width = right - left;
    const height = bottom - top;
    return new Rectangle(left, top, width, height, 0);
  }

  public rotate (angle:number): void {
    this.radians = angle;
  }

  public resize (w:number, h:number) :void {
    this.width = w;
    this.height = h;
  }

  /*
     +---------------+
     |               |
     |               |
     |       +---------------+
     |       |       |       |
     |       |       |       |
   y +-------|-------+       |
     x       |               |
             |               |
             +---------------+
  */
  public overlaps (other:Rectangle):boolean {
    return this.containsRectangle(other) || other.containsRectangle(this);
  }

  /*
    This function checks to see if a rectangle is inside another.
     +---------------+
     |  +---------+  |
     |  |         |  |
     |  |         |  |
     |  |         |  |
     |  +---------+  |
   y +---------------+
    x
  */
  private containsRectangle ({ points }:Rectangle): boolean {
    return (
      this.contains(points[0]) ||
      this.contains(points[1]) ||
      this.contains(points[2]) ||
      this.contains(points[3])
    );
  }

  /*
    This function allows you to check if a point is inside a rectangle.
     +---------------+
     |               |
     |               |
     |       •       |
     |               |
     |               |
   y +---------------+
    x
  */
  public contains (p: Vec2): boolean {
    const origin = new Vec2(this.left + this.width / 2, this.top + this.height / 2);
    const newVec2 = p.rotate(origin, -this.radians);
    return newVec2.x >= this.left &&
      newVec2.x < this.right &&
      newVec2.y >= this.top &&
      newVec2.y < this.bottom;
  }
}

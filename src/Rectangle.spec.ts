import {Rectangle} from './Rectangle';
import {Vec2} from './Vec2';

const toRadians = degrees => (degrees % 360) * Math.PI / 180.0;

describe('Rectangle specs', function () {
  it('should set top, left, height and width', function () {
    const subject = new Rectangle(25, 50, 100, 200);

    expect(subject.left).toBe(25);
    expect(subject.top).toBe(50);
    expect(subject.width).toBe(100);
    expect(subject.height).toBe(200);
  });

  it('should compute bottom and right props', function () {
    const subject = new Rectangle(25, 50, 100, 200);

    expect(subject.right).toBe(125);
    expect(subject.bottom).toBe(250);
  });

  it('should compute the area as the width x height', function () {
    const subject = new Rectangle(10, 20, 50, 100, 0);
    expect(subject.area).toBe(5000);
  });

  it('should set height and width to the values specified when resized', function () {
    // arrange
    const subject = new Rectangle(25, 50, 100, 200);
    // act
    subject.resize(30, 60);
    // assert
    expect(subject.width).toBe(30);
    expect(subject.height).toBe(60);
  });

  describe('contains', function () {
    it('should return true if a point is inside the rectangle', function () {
      // arrange
      const subject = new Rectangle(0, 0, 100, 100);
      // assert
      // NOTE that this rectangle definition treats the left/top and right/bottom boundaries differently; e.g.
      //  the left and top coordinates are considered "inside" while the right and bottom" coordinates are "outside"
      for (let x = subject.left; x < subject.right; x++) {
        for (let y = subject.top; y < subject.bottom; y++) {
          expect(subject.contains(new Vec2(x, y))).toBe(true);
        }
      }
    });

    it('should return false if a point is not inside the rectangle', function () {
      // arrange
      const subject = new Rectangle(50, 50, 100, 100);
      // assert
      expect(subject.contains(new Vec2(25, 75))).toBe(false); // above
      expect(subject.contains(new Vec2(75, 25))).toBe(false); // left
      expect(subject.contains(new Vec2(75, 175))).toBe(false); // right
      expect(subject.contains(new Vec2(175, 175))).toBe(false); // bottom
    });
  });

  describe('overlaps', function () {
    it('should return true if any point is inside or aligned', function () {
      const subject = new Rectangle(0, 0, 100, 100);

      // identical rectangle is overlaid on top of subject
      expect(subject.overlaps(new Rectangle(0, 0, 100, 100))).toBe(true);
      // rectangle is completely contained inside subject
      expect(subject.overlaps(new Rectangle(25, 25, 50, 50))).toBe(true);
      // rectangle is partially contained inside subject
      expect(subject.overlaps(new Rectangle(50, 50, 100, 100))).toBe(true);
      // rectangle is exactly aligned to subject
      expect(subject.overlaps(new Rectangle(0, 0, 100, 100))).toBe(true);
      // 2 un rotated rectangles whose borders are touching
      expect(subject.overlaps(new Rectangle(100, 90, 50, 50))).toBe(true);
      // rotation causes overlap
      expect(subject.overlaps(new Rectangle(110, 0, 100, 100, toRadians(45)))).toBe(true);
      // rectangle surrounds subject
      expect(subject.overlaps(new Rectangle(-25, -25, 150, 150))).toBe(true);

      // rectangle is exactly aligned to subject, rotated slightly
      // TODO: Fix this!
      // expect(subject.overlaps(new Rectangle(0, 0, 100, 100, toRadians(1)))).toBe(true);
    });
    it('should return false if any point is outside', function () {
      const subject = new Rectangle(0, 0, 100, 100);

      // No overlap
      expect(subject.overlaps(new Rectangle(101, 101, 100, 100))).toBe(false);
      // Rotated rect
      expect(subject.overlaps(new Rectangle(100, 100, 100, 100, 45))).toBe(false);
    });
  });

  describe('points', function () {
    it('should provide a list of points representing each corner', function () {
      const subject = new Rectangle(0, 0, 100, 100);
      expect(subject.points).toEqual(expect.objectContaining([
        {x: 0, y: 0},
        {x: 100, y: 0},
        {x: 100, y: 100},
        {x: 0, y: 100}
      ]));
    });

    it('should rotate the point list around the center of the box when initialized with a rotation', function () {
      const subject = new Rectangle(0, 0, 100, 100, toRadians(45));

      expect(subject.points).toEqual(expect.objectContaining([
        {x: 49.99999999999999, y: -20.710678118654755},
        {x: 120.71067811865476, y: 49.99999999999999},
        {x: 50.00000000000001, y: 120.71067811865476},
        {x: -20.710678118654755, y: 50.00000000000001}]
      ));
    });
  });

  describe('boundingBox', function () {
    it('should provide a bounding box that contains the rotated rectangle coordinates', function () {
      const subject = new Rectangle(0, 0, 100, 100, toRadians(45));

      const expected = new Rectangle(-20.710678118654755, -20.710678118654755, 141.4213562373095, 141.4213562373095, 0);
      expect(subject.boundingBox).toEqual(expect.objectContaining(expected));
    });
  });
});

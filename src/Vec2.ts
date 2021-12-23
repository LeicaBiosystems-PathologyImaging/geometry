/**
 * 2 Dimensional Vector
 */
export class Vec2 {
  public x!: number;
  public y!: number;

  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Rotate a 2D vector
   * @param {Vec2} origin The origin to rotate around
   * @param {Number} rad The angle of rotation in radians
   * @returns {Vec2} out
   */
  public rotate (origin:Vec2, rad:number): Vec2 {
    const { x: originX, y: originY } = origin;
    const { x: pointX, y: pointY } = this;
    return new Vec2(
        Math.cos(rad) * (pointX - originX) -
        Math.sin(rad) * (pointY - originY) +
        originX,
        Math.sin(rad) * (pointX - originX) +
        Math.cos(rad) * (pointY - originY) +
        originY
    );
  }
}

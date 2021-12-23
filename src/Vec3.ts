/**
 * 3 Dimensional Vector
 */
export class Vec3 {
  public x!: number;
  public y!: number;
  public z!: number;

  constructor (x: number, y: number, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

import { Vec2 } from './Vec2';
import { Vec3 } from './Vec3';

export class Vertex {
  public pos!: Vec3;
  public color!: Vec3;
  public uv!: Vec2;

  constructor (pos: Vec3, uv: Vec2 = new Vec2(0, 0)) {
    this.pos = pos;
    this.uv = uv;
  }
}

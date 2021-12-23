import { Vec2 } from './Vec2';
import { Vec3 } from './Vec3';

export class Transform {
  public position: Vec2 = new Vec2(0, 0);
  public scale: Vec2 = new Vec2(0, 0);
  public rotation: Vec3 = new Vec3(0, 0, 0);
  public origin: Vec2 = new Vec2(0, 0);
}

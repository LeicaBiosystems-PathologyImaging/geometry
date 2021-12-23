import { Vec2 } from './Vec2';

export class Point extends Vec2 {
  public x: number;
  public y: number;

  constructor (x:number, y:number) {
    super(x, y);
    this.x = x;
    this.y = y;
  }

}

type GlRenderingContext = WebGL2RenderingContext | WebGLRenderingContext;

interface IndexedCollection extends Iterable<number> {
  readonly length: number;

  [index: number]: number;
}

declare type mat4 =
  | [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number
    ]
  | IndexedCollection;

declare type vec3 = [number, number, number] | IndexedCollection;

precision mediump float;
varying float stop;
varying vec2 delta;

void main() {
  vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
  float x = gl_FragCoord.x - (delta.x / 2.0);
  float y = gl_FragCoord.y - (delta.y / 2.0);

  if (mod(x, stop) <= 1.0) {
    color = vec4(0.0, 1.0, 1.0, 1.0);
  } else if (mod(y, stop) <= 1.0) {
    color = vec4(1.0, 0.0, 1.0, 1.0);
  }

  gl_FragColor = color;
  // vec4(mod(gl_FragCoord.x, 100.0) / 100.0, mod(gl_FragCoord.y, 100.0) / 100.0, 1.0, 1.0);
}




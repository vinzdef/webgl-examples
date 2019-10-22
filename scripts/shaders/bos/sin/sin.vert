precision mediump float;
attribute vec4 a_Position;
uniform vec2 u_Resolution;
varying float stop;
varying vec2 delta;

// float gcd(float u, float v) {
// 	u = abs(u);
// 	v = abs(v);
// 	// While loop is not always allowed, use a for loop.
// 	for (int i = 0; i < 1000000; ++i) {
// 		if (v == 0.) break;
// 		u = mod(u, v);
// 		if (u == 0.) break;
// 		v = mod(v, u);
// 	}
// 	return u + v;
// }

void main() {
  stop = 100.0;
  delta = vec2(mod(u_Resolution.x, stop), mod(u_Resolution.y, stop));
  gl_Position = a_Position;
}

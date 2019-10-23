precision mediump float;
uniform sampler2D u_Sampler;
// uniform sampler2D u_Sampler1;
varying vec2 v_TexCoord;

void main() {
  gl_FragColor = texture2D(u_Sampler, v_TexCoord);
  // vec4 color0 = texture2D(u_Sampler0, v_TexCoord);
  // vec4 color1 = texture2D(u_Sampler1, v_TexCoord);
  // gl_FragColor = mix(color0, color1, 0.5);
}

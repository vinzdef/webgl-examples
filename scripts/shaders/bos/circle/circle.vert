precision mediump float;

attribute vec2 a_UV;
attribute vec2 a_Position;
uniform vec2 u_Resolution;
varying vec2 v_UV;

void main(){
  vec2 zeroToOne=a_Position/u_Resolution;
  vec2 zeroToTwo=zeroToOne*2.;
  vec2 clipSpace=zeroToTwo-1.;
  v_UV=a_UV;

  gl_Position=vec4(clipSpace,0,1);
}

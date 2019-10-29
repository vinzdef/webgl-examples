precision mediump float;
attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec4 a_Normal;
uniform vec3 u_AmbientLight;
uniform vec3 u_PointLightPosition;
uniform vec3 u_LightColor;
uniform vec3 u_LightDirection;
uniform mat4 u_NormalMatrix;
uniform mat4 u_ModelViewMatrix;
uniform mat4 u_ModelMatrix;
uniform mat4 u_ProjectionMatrix;

varying vec4 v_Color;
varying vec3 v_Normal;
varying vec3 v_Position;

void main() {
  gl_Position = u_ProjectionMatrix * u_ModelViewMatrix * a_Position;

  v_Position = vec3(u_ModelMatrix * a_Position);
  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
  v_Color = a_Color;
}

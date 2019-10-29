precision mediump float;
attribute vec4 a_Position;
attribute vec4 a_Color;
attribute vec4 a_Normal;
uniform vec3 u_AmbientLight;
uniform vec3 u_LightColor;
uniform vec3 u_LightDirection;
uniform mat4 u_ModelViewMatrix;
uniform mat4 u_ProjectionMatrix;
varying vec4 v_Color;

void main() {
  gl_Position = u_ProjectionMatrix * u_ModelViewMatrix * a_Position;

  vec3 normal = normalize(vec3(a_Normal));
  float nDotL = max(dot(u_LightDirection, normal), 0.0);
  vec3 diffuse = u_LightColor * vec3(a_Color) * nDotL;
  vec3 ambient = u_AmbientLight * a_Color.rgb;

  v_Color = vec4(diffuse + ambient, a_Color.a);
}

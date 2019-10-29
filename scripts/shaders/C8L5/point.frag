precision mediump float;

uniform vec3 u_PointLightPosition;
uniform vec3 u_LightColor;

varying vec4 v_Color;
varying vec3 v_Normal;
varying vec3 v_Position;

void main() {
  vec3 normal = normalize(v_Normal);
  vec3 lightDirection = normalize(u_PointLightPosition - v_Position);
  float cosD = max(dot(lightDirection, normal), 0.0);
  vec3 diffuse = u_LightColor * v_Color.rgb * cosD;

  gl_FragColor = vec4(diffuse, v_Color.a);
}

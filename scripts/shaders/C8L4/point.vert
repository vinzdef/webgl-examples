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

void main() {
  gl_Position = u_ProjectionMatrix * u_ModelViewMatrix * a_Position;
  vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));

  //light 1
  // float cosD1 = max(dot(u_LightDirection, normal), 0.0);
  // vec3 diffuse1 = u_LightColor * vec3(a_Color) * cosD1;

  //light 2
  vec4 vertexPosition = u_ModelMatrix * a_Position;
  vec3 lightDirection = normalize(u_PointLightPosition - vec3(vertexPosition));
  float cosD2 = max(dot(lightDirection, normal), 0.0);
  vec3 diffuse2 = u_LightColor * vec3(a_Color) * cosD2;

  // vec3 ambient = u_AmbientLight * a_Color.rgb;

  v_Color = vec4(diffuse2, a_Color.a);
}

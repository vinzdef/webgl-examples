#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_Resolution;

void main(){
  vec2 st=gl_FragCoord.xy/u_Resolution.xy;
  st.x*=u_Resolution.x/u_Resolution.y;
  vec3 color=vec3(0.);
  float d=0.;

  // Remap the space to -1. to 1.
  st=st*2.-1.;

  // Make the distance field
  d=length(abs(st)-.3);
  // d = length( min(abs(st)-.3,0.) );
  // d = length( max(abs(st)-.3,0.) );

  // Visualize the distance field
  gl_FragColor=vec4(vec3(fract(d*10.)),1.);

  // Drawing with the distance field
  // gl_FragColor = vec4(vec3( step(.3,d) ),1.0);
  // gl_FragColor = vec4(vec3( step(.3,d) * step(d,.4)),1.0);
  // gl_FragColor = vec4(vec3( smoothstep(.3,.4,d)* smoothstep(.6,.5,d)) ,1.0);
}
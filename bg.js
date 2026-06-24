const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
}
resize();
window.addEventListener('resize', resize);

const vsSource = `
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

const fsSource = `
  precision highp float;
  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec2 iMouse;

  mat2 rotate(float r) {
    return mat2(cos(r), sin(r), -sin(r), cos(r));
  }

  const vec3 PINK = vec3(233.0, 69.0, 245.0) / 255.0;
  const vec3 BLUE = vec3(6.0, 182.0, 212.0) / 255.0;
  const vec3 DEEP = vec3(12.0, 0.0, 255.0) / 255.0;

  vec3 getColor(float t) {
    if (t < 0.5) return mix(PINK, DEEP, t * 2.0);
    return mix(DEEP, BLUE, (t - 0.5) * 2.0);
  }

  float wave(vec2 uv, float offset, float speed, float amp) {
    float time = iTime * speed;
    float y = sin(uv.x * 0.8 + offset + time) * amp
             + sin(uv.x * 0.3 + offset * 0.7 + time * 0.6) * amp * 0.5;
    float m = uv.y - y;
    return 0.018 / (abs(m) + 0.015);
  }

  void main() {
    vec2 uv = (2.0 * gl_FragCoord.xy - iResolution.xy) / iResolution.y;
    uv.y *= -1.0;

    vec2 mouse = (iMouse / iResolution - 0.5) * 0.08;
    uv -= mouse;

    vec3 col = vec3(0.0);

    for (int i = 0; i < 10; i++) {
      float fi = float(i);
      float t = fi / 9.0;
      vec3 lineCol = getColor(t) * 0.9;
      float angle = 0.2 * log(length(uv) + 1.0);
      vec2 ruv = uv * rotate(angle);
      col += lineCol * wave(ruv + vec2(fi * 0.05, 0.0), 2.0 + 0.15 * fi, 0.25, 0.28);
    }

    for (int i = 0; i < 7; i++) {
      float fi = float(i);
      float t = fi / 6.0;
      vec3 lineCol = getColor(t) * 0.5;
      float angle = -0.4 * log(length(uv) + 1.0);
      vec2 ruv = uv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(ruv + vec2(fi * 0.07 + 10.0, 0.5), 1.0 + 0.2 * fi, 0.18, 0.22) * 0.12;
    }

    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      float t = fi / 5.0;
      vec3 lineCol = getColor(t) * 0.4;
      float angle = -1.0 * log(length(uv) + 1.0);
      vec2 ruv = uv * rotate(angle);
      col += lineCol * wave(ruv + vec2(fi * 0.06 + 2.0, -0.7), 1.5 + 0.2 * fi, 0.2, 0.2) * 0.2;
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

function compileShader(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

const vs = compileShader(gl.VERTEX_SHADER, vsSource);
const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
gl.useProgram(program);

const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
const loc = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

const uTime = gl.getUniformLocation(program, 'iTime');
const uRes = gl.getUniformLocation(program, 'iResolution');
const uMouse = gl.getUniformLocation(program, 'iMouse');

let mouse = { x: 0, y: 0 };
canvas.addEventListener('mousemove', e => {
  const r = canvas.getBoundingClientRect();
  mouse.x = e.clientX - r.left;
  mouse.y = e.clientY - r.top;
});

function render(t) {
  gl.uniform1f(uTime, t * 0.001);
  gl.uniform2f(uRes, canvas.width, canvas.height);
  gl.uniform2f(uMouse, mouse.x, mouse.y);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
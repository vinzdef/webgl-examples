
import BaseChapter from '~/utils/base-chapter'
import {initShaders} from '~/lib/cuon-utils'
import {Matrix4, Vector3} from '~/lib/cuon-matrix'
import vert from '~/shaders/C7L11/point.vert'
import frag from '~/shaders/C7L11/point.frag'

export default class C7L11 extends BaseChapter {
  prepare(gl) {
    this.dirty = true

    this.eye = new Vector3()
    this.eye.elements[0] = 3.06
    this.eye.elements[1] = 2.5
    this.eye.elements[2] = 10.0

    initShaders(gl, vert, frag)

    this.initVertexBuffers()
    this.initModelViewMatrix()
    this.initProjectionMatrix()

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)
  }

  initProjectionMatrix() {
    const {gl} = this
    this.u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix')

    this.projectionMatrix = new Matrix4()
    this.projectionMatrix.setPerspective(30, this.S.W / this.S.H, 1, 100)

    gl.uniformMatrix4fv(this.u_ProjectionMatrix, false, this.projectionMatrix.elements)
  }

  initModelViewMatrix() {
    const {gl} = this
    this.u_ModelViewMatrix = gl.getUniformLocation(gl.program, 'u_ModelViewMatrix')

    this.modelViewMatrix = new Matrix4()

    this.modelViewMatrix.setLookAt(
      ...this.eye.elements,    // Eye
      0, 0, -100,   // Look at
      0, 1, 0     // Up Direction
    )


    gl.uniformMatrix4fv(this.u_ModelViewMatrix, false, this.modelViewMatrix.elements)
  }

  initVertexBuffers() {
    const {gl} = this

    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3
    const vertices = new Float32Array([
      1.0, 1.0, 1.0,  -1.0, 1.0, 1.0,  -1.0, -1.0, 1.0,   1.0, -1.0, 1.0,  // v0-v1-v2-v3 front
      1.0, 1.0, 1.0,   1.0, -1.0, 1.0,   1.0, -1.0, -1.0,   1.0, 1.0, -1.0,  // v0-v3-v4-v5 right
      1.0, 1.0, 1.0,   1.0, 1.0, -1.0,  -1.0, 1.0, -1.0,  -1.0, 1.0, 1.0,  // v0-v5-v6-v1 up
      -1.0, 1.0, 1.0,  -1.0, 1.0, -1.0,  -1.0, -1.0, -1.0,  -1.0, -1.0, 1.0,  // v1-v6-v7-v2 left
      -1.0, -1.0, -1.0,   1.0, -1.0, -1.0,   1.0, -1.0, 1.0,  -1.0, -1.0, 1.0,  // v7-v4-v3-v2 down
      1.0, -1.0, -1.0,  -1.0, -1.0, -1.0,  -1.0, 1.0, -1.0,   1.0, 1.0, -1.0   // v4-v7-v6-v5 back
    ])

    const colors = new Float32Array([
      0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  0.4, 0.4, 1.0,  // v0-v1-v2-v3 front(blue)
      0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  0.4, 1.0, 0.4,  // v0-v3-v4-v5 right(green)
      1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  1.0, 0.4, 0.4,  // v0-v5-v6-v1 up(red)
      1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  1.0, 1.0, 0.4,  // v1-v6-v7-v2 left
      1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  1.0, 1.0, 1.0,  // v7-v4-v3-v2 down
      0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0,  0.4, 1.0, 1.0   // v4-v7-v6-v5 back
    ])

    const indices = new Uint8Array([
      0, 1, 2,   0, 2, 3,    // front
      4, 5, 6,   4, 6, 7,    // right
      8, 9, 10,   8, 10, 11,    // up
      12, 13, 14,  12, 14, 15,    // left
      16, 17, 18,  16, 18, 19,    // down
      20, 21, 22,  20, 22, 23     // back
    ])

    const verticesBuff = gl.createBuffer()
    const colorsBuff = gl.createBuffer()
    const indicesBuffer = gl.createBuffer()

    this.a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuff)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    gl.vertexAttribPointer(this.a_Position, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(this.a_Position)

    this.a_Color = gl.getAttribLocation(gl.program, 'a_Color')
    gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuff)
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW)
    gl.vertexAttribPointer(this.a_Color, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(this.a_Color)

    gl.bindBuffer(gl.ARRAY_BUFFER, null)

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)
  }


  update() {
    const {gl, keys} = this

    // Left
    if (keys.includes(65) || keys.includes(37)) {
      this.eye.elements[0] -= 1
      this.dirty = true
    }

    // Right
    if (keys.includes(68) || keys.includes(39)) {
      this.eye.elements[0] += 1
      this.dirty = true
    }

    if (this.dirty) {
      this.modelViewMatrix.setLookAt(
        ...this.eye.elements,    // Eye
        0, 0, -2,            // Look at
        0, 1, 0              // Up Direction
      )

      gl.uniformMatrix4fv(this.u_ModelViewMatrix, false, this.modelViewMatrix.elements)
    }
  }

  draw(gl) {
    if (!this.dirty) return
    this.dirty = false
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0)
  }

  resize() {
    this.projectionMatrix.setPerspective(30, this.S.W / this.S.H, 1, 100)
    this.gl.uniformMatrix4fv(this.u_ProjectionMatrix, false, this.projectionMatrix.elements)
    this.dirty = true
  }
}

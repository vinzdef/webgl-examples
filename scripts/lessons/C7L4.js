import BaseChapter from '~/utils/base-chapter'
import {initShaders} from '~/lib/cuon-utils'
import {Matrix4, Vector3} from '~/lib/cuon-matrix'
import vert from '~/shaders/C7L4/point.vert'
import frag from '~/shaders/C7L4/point.frag'

export default class C7L4 extends BaseChapter {
  prepare(gl) {
    this.eye = new Vector3()
    this.eye.elements[0] = 0
    this.eye.elements[1] = 0.25
    this.eye.elements[2] = 0.25

    this.dirty = true

    initShaders(gl, vert, frag)

    this.initVertexBuffers()
    this.initModelViewMatrix()

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  initModelViewMatrix() {
    const {gl} = this
    this.u_ModelViewMatrix = gl.getUniformLocation(gl.program, 'u_ModelViewMatrix')

    this.modelViewMatrix = new Matrix4()
    this.modelViewMatrix.setLookAt(
      ...this.eye.elements,    // Eye
      0, 0, 0,   // Look at
      0, 1, 0     // Up Direction
    )

    // this.viewMatrix.setLookAt(0.20, 0.25, 0.25, 0, 0, 0, 0, 1, 0)
    // this.modelViewMatrix = this.viewMatrix.multiply(this.modelMatrix)

    gl.uniformMatrix4fv(this.u_ModelViewMatrix, false, this.modelViewMatrix.elements)
  }

  initVertexBuffers() {
    const {gl} = this
    const verticesAndColors = new Float32Array([
    // Vertices            Colors
      0.0,  0.5,  -0.4,  0.4,  1.0,  0.4, // The back green one
      -0.5, -0.5,  -0.4,  0.4,  1.0,  0.4,
      0.5, -0.5,  -0.4,  1.0,  0.4,  0.4,

      0.5,  0.4,  -0.2,  1.0,  0.4,  0.4, // The middle yellow one
      -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,
      0.0, -0.6,  -0.2,  1.0,  1.0,  0.4,

      0.0,  0.5,   0.0,  0.4,  0.4,  1.0,  // The front blue one
      -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,
      0.5, -0.5,   0.0,  1.0,  0.4,  0.4,
    ])

    const verticesAndColorsBuffer = gl.createBuffer()
    if (!verticesAndColorsBuffer) {
      console.error('Failed to create buffer')
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, verticesAndColorsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, verticesAndColors, gl.STATIC_DRAW)

    const FSIZE = verticesAndColors.BYTES_PER_ELEMENT

    this.a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    this.a_Color = gl.getAttribLocation(gl.program, 'a_Color')

    gl.vertexAttribPointer(this.a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0)
    gl.enableVertexAttribArray(this.a_Position)

    gl.vertexAttribPointer(this.a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3)
    gl.enableVertexAttribArray(this.a_Color)

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
  }

  update() {
    const {gl, keys} = this

    if (keys.includes(68) || keys.includes(39)) {
      this.eye.elements[0] += 0.01
      this.dirty = true
    }

    if (keys.includes(65) || keys.includes(37)) {
      this.eye.elements[0] -= 0.01
      this.dirty = true
    }

    // if (keys.includes(65) || keys.includes(37)) {
    //   this.modelViewMatrix.translate(-0.01, 0, 0, 1)
    // }

    // if (keys.includes(68) || keys.includes(39)) {
    //   this.modelViewMatrix.translate(0.01, 0, 0, 1)
    // }

    // if (keys.includes(83) || keys.includes(40)) {
    //   this.modelViewMatrix.translate(0, -0.01, 0, 1)
    // }

    // if (keys.includes(87) || keys.includes(38)) {
    //   this.modelViewMatrix.translate(0, 0.01, 0, 1)
    // }

    if (this.dirty) {
      this.modelViewMatrix.setLookAt(
        ...this.eye.elements,
        0, 0, 0,
        0, 1, 0
      )
      gl.uniformMatrix4fv(this.u_ModelViewMatrix, false, this.modelViewMatrix.elements)
    }
  }

  draw(gl) {
    if (!this.dirty) return
    this.dirty = false
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 9)
  }
}

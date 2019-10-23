import BaseChapter from '~/utils/base-chapter'
import {initShaders} from '~/lib/cuon-utils'
import {Matrix4} from '~/lib/cuon-matrix'
import vert from '~/shaders/C7L1/point.vert'
import frag from '~/shaders/C7L1/point.frag'

export default class C7L1 extends BaseChapter {
  prepare(gl) {
    initShaders(gl, vert, frag)

    this.initVertexBuffers()
    this.initViewMatrix()

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  initViewMatrix() {
    const {gl} = this
    this.u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix')

    this.viewMatrix = new Matrix4()
    this.viewMatrix.setLookAt(
      0.20, 0.25, 0.25,    // Eye
      0, 0, -1,   // Look at
      0, 1, 0     // Up Direction
    )

    gl.uniformMatrix4fv(this.u_ViewMatrix, false, this.viewMatrix.elements)
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

  draw(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 9)
  }
}

import BaseChapter from '~/utils/base-chapter'
import {Matrix4} from '~/lib/cuon-matrix'
import {initShaders} from '~/lib/cuon-utils'
import vert from '~/shaders/C3L8/point.vert'
import frag from '~/shaders/C3L8/point.frag'

export default class C3L6 extends BaseChapter {
  prepare(gl) {
    this.points = []

    initShaders(gl, vert, frag)

    this.a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    this.u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix')

    this.initVertexBuffers()

    gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(this.a_Position)

    const xformMatrix = new Matrix4()
    xformMatrix.setTranslate(0.5, 0, 0)
    xformMatrix.rotate(90, 0, 0, 1)
    // xformMatrix.scale(0.4, 0.4, 1)

    gl.uniformMatrix4fv(this.u_xformMatrix, false, xformMatrix.elements)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  initVertexBuffers() {
    const vertices = new Float32Array([
      0.0, 0.5,
      -0.5, -0.5,
      0.5, -0.5
    ])

    const vertexBuffer = this.gl.createBuffer()
    if (!vertexBuffer) {
      console.error('Failed to create buffer')
    }

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer)
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW)
  }

  draw(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
}

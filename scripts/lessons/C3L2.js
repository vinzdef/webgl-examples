import BaseChapter from '~/utils/base-chapter'
import {initShaders} from '~/lib/cuon-utils'
import vert from '~/shaders/C3L2/point.vert'
import frag from '~/shaders/C3L2/point.frag'

export default class C3L2 extends BaseChapter {
  prepare(gl) {
    this.points = []

    initShaders(gl, vert, frag)

    this.initVertexBuffers()

    this.a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    if (this.a_Position < 0) {
      console.error('Failed to retreive attribute `a_Position` location')
    }

    gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(this.a_Position)

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

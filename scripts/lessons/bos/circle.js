import BaseChapter from '~/utils/base-chapter'
import {initShaders} from '~/lib/cuon-utils'
import vert from '~/shaders/bos/circle/circle.vert'
import frag from '~/shaders/bos/circle/circle.frag'

const CIRCLE_R = 100

function quad(radius, {x, y}) {
  const circle = [
    x - radius, y - radius,
    x + radius, y - radius,
    x - radius, y + radius,
    x + radius, y + radius
  ]

  return circle
}

export default class BosCircle extends BaseChapter {
  prepare(gl) {
    initShaders(gl, vert, frag)
    this.u_Resolution = gl.getUniformLocation(this.gl.program, 'u_Resolution')
    this.a_Position = gl.getAttribLocation(this.gl.program, 'a_Position')

    gl.uniform2f(this.u_Resolution, this.S.W, this.S.H)
    gl.clearColor(0, 0.094, 0.211, 1)

    this.VERTICES_BUFFER = gl.createBuffer()
  }

  update() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    this.vertices = [
      quad(CIRCLE_R, {
        x: this.S.W / 2,
        y: this.S.H / 2
      })
    ]
  }

  draw(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT)

    for (let i = 0; i < this.vertices.length; ++i) {
      gl.bindBuffer(gl.ARRAY_BUFFER, this.VERTICES_BUFFER)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices[i]), gl.STATIC_DRAW)

      gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(this.a_Position)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, ~~(this.vertices[i].length / 2))
    }
  }
}

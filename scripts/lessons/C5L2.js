import BaseChapter from '~/utils/base-chapter'
import {initShaders} from '~/lib/cuon-utils'
import vert from '~/shaders/C5L2/point.vert'
import frag from '~/shaders/C5L2/point.frag'

export default class C5L2 extends BaseChapter {
  prepare(gl) {
    this.points = []

    initShaders(gl, vert, frag)

    this.initVertexBuffers()

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  initVertexBuffers() {
    const {gl} = this
    const verticesAndColors = new Float32Array([
      0.0, 0.5, 1.0, 0.0, 0.0,
      -0.5, -0.5, 0.0, 1.0, 0.0,
      0.5, -0.5, 0.0, 0.0, 1.0
    ])

    const verticesAndColorsBuffer = gl.createBuffer()
    if (!verticesAndColorsBuffer) {
      console.error('Failed to create buffer')
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, verticesAndColorsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, verticesAndColors, gl.STATIC_DRAW)

    const FSIZE = verticesAndColors.BYTES_PER_ELEMENT

    this.a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    const positionStride = FSIZE * 5 // We have a position component (x,y) every 3 bytes
    gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, positionStride, 0)
    gl.enableVertexAttribArray(this.a_Position)

    this.a_Color = gl.getAttribLocation(gl.program, 'a_Color')
    const colorStride = FSIZE * 5 // We have a size value every 3 bytes
    const colorOffset = FSIZE * 2 // Starting at the 3rd value in the buffer
    gl.vertexAttribPointer(this.a_Color, 3, gl.FLOAT, false, colorStride, colorOffset)
    gl.enableVertexAttribArray(this.a_Color)
  }

  draw(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
}

import BaseChapter from '~/utils/base-chapter'
import {initShaders} from '~/lib/cuon-utils'
import vert from '~/shaders/C5L1/point.vert'
import frag from '~/shaders/C5L1/point.frag'

export default class C5L1 extends BaseChapter {
  prepare(gl) {
    this.points = []

    initShaders(gl, vert, frag)

    this.initVertexBuffers()

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  initVertexBuffers() {
    const {gl} = this
    const verticesAndSizes = new Float32Array([
      0.0, 0.5, 10.0,
      -0.5, -0.5, 20.0,
      0.5, -0.5, 30.0
    ])

    const verticesAndSizesBuffer = gl.createBuffer()
    if (!verticesAndSizesBuffer) {
      console.error('Failed to create buffer')
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, verticesAndSizesBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, verticesAndSizes, gl.STATIC_DRAW)

    const FSIZE = verticesAndSizes.BYTES_PER_ELEMENT

    this.a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    const positionStride = FSIZE * 3 // We have a position component (x,y) every 3 bytes
    gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, positionStride, 0)
    gl.enableVertexAttribArray(this.a_Position)

    this.a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    const pointStride = FSIZE * 3 // We have a size value every 3 bytes
    const pointOffset = FSIZE * 2 // Starting at the 3rd value in the buffer
    gl.vertexAttribPointer(this.a_PointSize, 1, gl.FLOAT, false, pointStride, pointOffset)
    gl.enableVertexAttribArray(this.a_PointSize)
  }

  draw(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, 3)
  }
}

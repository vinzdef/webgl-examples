import BaseChapter from '~/utils/base-chapter'
import {initShaders} from '~/lib/cuon-utils'
import vert from '~/shaders/C2L3/point.vert'
import frag from '~/shaders/C2L3/point.frag'

export default class C2L3 extends BaseChapter {
  prepare(gl) {
    initShaders(gl, vert, frag)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)
    gl.vertexAttrib1f(a_PointSize, 10.0)
  }

  draw(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, 1)
  }
}

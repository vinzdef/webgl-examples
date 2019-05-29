import BaseChapter from '~/utils/base-chapter'
import {initShaders} from '~/lib/cuon-utils'
import vert from '~/shaders/C2L2/point.vert'
import frag from '~/shaders/C2L2/point.frag'

export default class C2L2 extends BaseChapter {
  prepare(gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    initShaders(gl, vert, frag)
  }

  draw(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, 1)
  }
}

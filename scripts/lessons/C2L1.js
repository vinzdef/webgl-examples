import BaseChapter from '~/utils/base-chapter'

export default class C2L1 extends BaseChapter {
  prepare(gl) {
    gl.clearColor(0.75, 0.23, 0.5, 1.0)
  }

  draw(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT)
  }
}

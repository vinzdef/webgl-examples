import BaseChapter from '~/utils/base-chapter'
import {on} from '@okiba/dom'
import {initShaders} from '~/lib/cuon-utils'
import vert from '~/shaders/C2L4/point.vert'
import frag from '~/shaders/C2L4/point.frag'
import {toClipSpace} from '~/utils/webgl-helpers'

export default class C2L4 extends BaseChapter {
  prepare(gl) {
    this.points = []

    initShaders(gl, vert, frag)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    this.a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    gl.vertexAttrib3f(this.a_Position, 0.0, 0.0, 0.0)
    gl.vertexAttrib1f(a_PointSize, 10.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  draw(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT)
    this.points.forEach(({x, y}) => {
      gl.vertexAttrib3f(this.a_Position, x, y, 0.0)
      gl.drawArrays(gl.POINTS, 0, 1)
    })
  }

  onClick({clientX, clientY}) {
    const x = toClipSpace(clientX, this.S.W)
    const y = toClipSpace(clientY, this.S.H, true)
    this.points.push({x, y})
  }
}

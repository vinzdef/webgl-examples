import BaseChapter from '~/utils/base-chapter'
import {initShaders} from '~/lib/cuon-utils'
import vert from '~/shaders/C2L5/point.vert'
import frag from '~/shaders/C2L5/point.frag'
import {toClipSpace} from '~/utils/webgl-helpers'

export default class C2L5 extends BaseChapter {
  prepare(gl) {
    this.points = []

    initShaders(gl, vert, frag)
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    this.a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    this.u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
    gl.vertexAttrib3f(this.a_Position, 0.0, 0.0, 0.0)
    gl.vertexAttrib1f(a_PointSize, 10.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  draw(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT)
    this.points.forEach(({x, y, color}) => {
      gl.vertexAttrib3f(this.a_Position, x, y, 0.0)
      gl.uniform4f(this.u_FragColor, ...color)
      gl.drawArrays(gl.POINTS, 0, 1)
    })
  }

  onClick({clientX, clientY}) {
    const x = toClipSpace(clientX, this.S.W)
    const y = toClipSpace(clientY, this.S.H, true)

    let color

    if (x >= 0 && y >= 0) {
      color = [1.0, 0.0, 0.0, 1.0]
    } else if (x < 0 && y < 0) {
      color = [0.0, 1.0, 0.0, 1.0]
    } else if (x >= 0 && y < 0) {
      color = [0.0, 0.0, 1.0, 1.0]
    } else if (x < 0 && y >= 0) {
      color = [1.0, 1.0, 0.0, 1.0]
    }

    this.points.push({x, y, color})
  }
}

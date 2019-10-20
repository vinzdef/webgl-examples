import Component from '@okiba/component'
import {qs, on} from '@okiba/dom'
import {getWebGLContext} from '~/lib/cuon-utils'

const ui = {
  scene: '#scene'
}

export default class BaseChapter extends Component {
  constructor() {
    super({el: qs('.Chapter'), ui})
    this.gl = getWebGLContext(this.ui.scene)
    this.S = {}

    this.setSizes()
    on(window, 'resize', _ => this.setSizes())
    this.onClick && on(this.ui.scene, 'click', this.onClick.bind(this))
    requestAnimationFrame(this.init)
  }

  init = _ => {
    this.prepare && this.prepare(this.gl)
    requestAnimationFrame(this.loop)
  }

  loop = _ => {
    if (!this.paused) {
      this.update && this.update(this.gl)
      this.draw && this.draw(this.gl)
    }
    requestAnimationFrame(this.loop)
  }

  setSizes() {
    this.ui.scene.width = this.S.W = window.innerWidth
    this.ui.scene.height = this.S.H = window.innerHeight
    this.gl.viewport(0, 0, this.S.W, this.S.H)
    if (this.u_Resolution) {
      this.gl.uniform2f(this.u_Resolution, this.S.W, this.S.H)
    }
  }
}

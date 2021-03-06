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
    this.mouse = {x: 0, y: 0}
    this.setSizes()
    on(window, 'resize', this.onResize)

    this.keys = []
    on(window, 'keydown', this.onKeyDown)
    on(window, 'mousemove', this.onMouseMove)
    on(window, 'keyup', this.onKeyUp)
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

  onKeyUp = e => {
    if (!this.keys.includes(e.keyCode)) return
    this.keys.splice(this.keys.indexOf(e.keyCode), 1)
  }

  onKeyDown = e => {
    if (this.keys.includes(e.keyCode)) return
    this.keys.push(e.keyCode)
  }

  onResize = () => {
    this.setSizes()
    if (this.resize) {
      this.resize()
    }
  }

  toClipSpace(n, dim) {
    return n / dim * 2 - 1
  }

  onMouseMove = ({clientX, clientY}) => {
    this.mouse.x = this.toClipSpace(clientX, this.S.W)
    this.mouse.y = this.toClipSpace(clientY, this.S.H)
    this.moveMouse && this.moveMouse()
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

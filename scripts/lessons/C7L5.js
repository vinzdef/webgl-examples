import {arrayOrOne} from '@okiba/arrays'
import {qsa} from '@okiba/dom'
import {round} from '@okiba/math'

import BaseChapter from '~/utils/base-chapter'
import {initShaders} from '~/lib/cuon-utils'
import {Matrix4, Vector3} from '~/lib/cuon-matrix'
import vert from '~/shaders/C7L5/point.vert'
import frag from '~/shaders/C7L5/point.frag'

const ui = {
  near: '.js-near',
  far: '.js-far',
}

export default class C7L5 extends BaseChapter {
  prepare(gl) {
    this.ui = Object.entries(ui).reduce(
      (acc, pair) => {
        acc[pair[0]] = arrayOrOne(qsa(pair[1]))
        return acc
      }, {}
    )

    this.shift = new Vector3()
    this.shift.elements[0] = 0
    this.shift.elements[1] = 0.5

    this.dirty = true

    initShaders(gl, vert, frag)

    this.initVertexBuffers()
    // this.initModelViewMatrix()
    this.initProjectionMatrix()

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  initProjectionMatrix() {
    const {gl} = this
    this.u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix')

    this.projectionMatrix = new Matrix4()
    this.projectionMatrix.setOrtho(
      -1.0, 1.0, -1.0, 1.0,
      ...this.shift.elements
    )

    gl.uniformMatrix4fv(this.u_ProjectionMatrix, false, this.projectionMatrix.elements)
  }

  initVertexBuffers() {
    const {gl} = this
    const verticesAndColors = new Float32Array([
    // Vertices            Colors
      0.0,  0.6,  -0.4,  0.4,  1.0,  0.4, // The back green one
      -0.5, -0.4,  -0.4,  0.4,  1.0,  0.4,
      0.5, -0.4,  -0.4,  1.0,  0.4,  0.4,

      0.5,  0.4,  -0.2,  1.0,  0.4,  0.4, // The middle yellow one
      -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,
      0.0, -0.6,  -0.2,  1.0,  1.0,  0.4,

      0.0,  0.5,   0.0,  0.4,  0.4,  1.0, // The front blue one
      -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,
      0.5, -0.5,   0.0,  1.0,  0.4,  0.4,
    ])

    const verticesAndColorsBuffer = gl.createBuffer()
    if (!verticesAndColorsBuffer) {
      console.error('Failed to create buffer')
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, verticesAndColorsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, verticesAndColors, gl.STATIC_DRAW)

    const FSIZE = verticesAndColors.BYTES_PER_ELEMENT

    this.a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    this.a_Color = gl.getAttribLocation(gl.program, 'a_Color')

    gl.vertexAttribPointer(this.a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0)
    gl.enableVertexAttribArray(this.a_Position)

    gl.vertexAttribPointer(this.a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3)
    gl.enableVertexAttribArray(this.a_Color)

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
  }

  update() {
    const {gl, keys} = this

    // Left
    if (keys.includes(65) || keys.includes(37)) {
      this.shift.elements[0] -= 0.01
      this.dirty = true
    }

    // Right
    if (keys.includes(68) || keys.includes(39)) {
      this.shift.elements[0] += 0.01
      this.dirty = true
    }

    // Up
    if (keys.includes(87) || keys.includes(38)) {
      this.shift.elements[1] += 0.01
      this.dirty = true
    }

    // Bottom
    if (keys.includes(83) || keys.includes(40)) {
      this.shift.elements[1] -= 0.01
      this.dirty = true
    }

    if (this.dirty) {
      this.projectionMatrix.setOrtho(
        -1.0, 1.0, -1.0, 1.0,
        ...this.shift.elements
      )

      this.ui.near.textContent = round(this.shift.elements[0], 3)
      this.ui.far.textContent = round(this.shift.elements[1], 3)

      gl.uniformMatrix4fv(this.u_ProjectionMatrix, false, this.projectionMatrix.elements)
    }
  }

  draw(gl) {
    if (!this.dirty) return
    this.dirty = false
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 9)
  }
}

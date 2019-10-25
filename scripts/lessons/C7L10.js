import {qs} from '@okiba/dom'
import BaseChapter from '~/utils/base-chapter'
import {initShaders} from '~/lib/cuon-utils'
import {Matrix4, Vector3} from '~/lib/cuon-matrix'
import vert from '~/shaders/C7L7/point.vert'
import frag from '~/shaders/C7L7/point.frag'

export default class C7L7 extends BaseChapter {
  prepare(gl) {
    this.dirty = true
    this.checkbox = qs('.js-checkbox')

    this.eye = new Vector3()
    this.eye.elements[0] = 3.06
    this.eye.elements[1] = 2.5
    this.eye.elements[2] = 10.0
    initShaders(gl, vert, frag)

    this.initVertexBuffers()
    this.initModelViewMatrix()
    this.initProjectionMatrix()

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.enable(gl.DEPTH_TEST)

    this.checkbox.addEventListener('click', () => {
      if (this.checkbox.checked) {
        console.log('POLYGON_OFFSET_FILL Enabled')
        gl.enable(gl.POLYGON_OFFSET_FILL)
      } else {
        console.log('POLYGON_OFFSET_FILL Disabled')
        gl.disable(gl.POLYGON_OFFSET_FILL)
      }
      this.dirty = true
    })
  }

  initProjectionMatrix() {
    const {gl} = this
    this.u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix')

    this.projectionMatrix = new Matrix4()
    this.projectionMatrix.setPerspective(30, this.S.W / this.S.H, 1, 100)

    gl.uniformMatrix4fv(this.u_ProjectionMatrix, false, this.projectionMatrix.elements)
  }

  initModelViewMatrix() {
    const {gl} = this
    this.u_ModelViewMatrix = gl.getUniformLocation(gl.program, 'u_ModelViewMatrix')

    this.modelViewMatrix = new Matrix4()

    this.modelViewMatrix.setLookAt(
      ...this.eye.elements,    // Eye
      0, 0, -100,   // Look at
      0, 1, 0     // Up Direction
    )


    gl.uniformMatrix4fv(this.u_ModelViewMatrix, false, this.modelViewMatrix.elements)
  }

  initVertexBuffers() {
    const {gl} = this
    const verticesAndColors = new Float32Array([
    // Vertices            Colors
      0.0,  2.5,  -5.0,  0.4,  1.0,  0.4, // The green triangle
      -2.5, -2.5,  -5.0,  0.4,  1.0,  0.4,
      2.5, -2.5,  -5.0,  1.0,  0.4,  0.4,

      0.0,  3.0,  -5.0,  1.0,  0.4,  0.4, // The yellow triagle
      -3.0, -3.0,  -5.0,  1.0,  1.0,  0.4,
      3.0, -3.0,  -5.0,  1.0,  1.0,  0.4,
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
      this.eye.elements[0] -= 0.01
      this.dirty = true
    }

    // Right
    if (keys.includes(68) || keys.includes(39)) {
      this.eye.elements[0] += 0.01
      this.dirty = true
    }

    if (this.dirty) {
      this.modelViewMatrix.setLookAt(
        ...this.eye.elements,    // Eye
        0, 0, -2,            // Look at
        0, 1, 0              // Up Direction
      )

      gl.uniformMatrix4fv(this.u_ModelViewMatrix, false, this.modelViewMatrix.elements)
    }
  }

  // https://stackoverflow.com/questions/29040083/is-there-a-bug-in-webgl-polygonoffset-or-am-i-missing-something
  draw(gl) {
    if (!this.dirty) return
    this.dirty = false
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.polygonOffset(0.0, 0.0)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    gl.polygonOffset(1.0, 1.0)
    gl.drawArrays(gl.TRIANGLES, 3, 3)
  }

  resize() {
    this.projectionMatrix.setPerspective(30, this.S.W / this.S.H, 1, 100)
    this.gl.uniformMatrix4fv(this.u_ProjectionMatrix, false, this.projectionMatrix.elements)
    this.dirty = true
  }
}

import BaseChapter from '~/utils/base-chapter'
import {initShaders} from '~/lib/cuon-utils'
import vert from '~/shaders/C5L3/point.vert'
import frag from '~/shaders/C5L3/point.frag'

export default class C5L3 extends BaseChapter {
  prepare(gl) {
    this.points = []

    initShaders(gl, vert, frag)

    this.initVertexBuffers()
    this.initTextures()

    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }

  initTextures() {
    const {gl} = this
    this.texture = gl.createTexture()
    this.u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler')
    gl.uniform1i(this.u_Sampler, 0)


    // Init with empty texture
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255]))


    this.image = new Image()
    this.image.addEventListener('load', this.loadTexture)
    this.image.src = '/assets/spin.png'
  }

  loadTexture = () => {
    const {gl, image, texture} = this
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texture)

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)
  }

  initVertexBuffers() {
    const {gl} = this
    /**
     * Setting image coords like this makes it loop (or clamp)
     * as we're going out of it's bounds (< 0 OR > 1).
     * */

    const verticesAndTexCoords = new Float32Array([
      -0.5, 0.5, -0.25, 1.25,
      -0.5, -0.5, -0.25, -0.25,
      0.5, 0.5, 1.25, 1.25,
      0.5, -0.5, 1.25, -0.25
    ])

    const verticesAndTexCoordsBuffer = gl.createBuffer()
    if (!verticesAndTexCoordsBuffer) {
      console.error('Failed to create buffer')
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, verticesAndTexCoordsBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, verticesAndTexCoords, gl.STATIC_DRAW)

    const FSIZE = verticesAndTexCoords.BYTES_PER_ELEMENT

    this.a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    this.a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord')

    const positionStride = FSIZE * 4 // We have a position component (x,y) every 3 bytes
    gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, positionStride, 0)
    gl.enableVertexAttribArray(this.a_Position)

    const coordStride = FSIZE * 4 // We have a size value every 3 bytes
    const coordOffset = FSIZE * 2 // Starting at the 3rd value in the buffer
    gl.vertexAttribPointer(this.a_TexCoord, 2, gl.FLOAT, false, coordStride, coordOffset)
    gl.enableVertexAttribArray(this.a_TexCoord)
  }

  draw(gl) {
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
}

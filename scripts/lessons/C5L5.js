import BaseChapter from '~/utils/base-chapter'
import {initShaders} from '~/lib/cuon-utils'
import vert from '~/shaders/C5L5/point.vert'
import frag from '~/shaders/C5L5/point.frag'

export default class C5L5 extends BaseChapter {
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
    this.u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0')
    this.u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1')

    // The first sampler could be omitted, since the first sampler found in shader defaults to TEXTURE0
    gl.uniform1i(this.u_Sampler0, 0)
    gl.uniform1i(this.u_Sampler1, 1)

    this.texture0 = gl.createTexture()
    this.texture1 = gl.createTexture()

    // Avoid error by uploading a simple texture
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.texture0)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255]))

    // Avoid error by uploading a simple texture
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, this.texture1)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 255, 0, 255]))

    this.image0 = new Image()
    this.image1 = new Image()

    Promise.all(
      [
        new Promise(res => this.image0.addEventListener('load', res)),
        new Promise(res => this.image1.addEventListener('load', res))
      ]
    ).then(this.loadTexture)

    this.image0.src = '/assets/floor.jpg'
    this.image1.src = '/assets/concrete.jpg'
  }

  loadTexture = () => {
    const {gl, image0, image1, texture0, texture1} = this

    const pairs = [[image0, texture0], [image1, texture1]]

    pairs.forEach(
      ([image, texture], index) => {
        gl.activeTexture(gl.TEXTURE0 + index)
        gl.bindTexture(gl.TEXTURE_2D, texture)

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      }
    )
  }

  initVertexBuffers() {
    const {gl} = this
    const verticesAndTexCoords = new Float32Array([
      // -0.5, 0.5, -0.25, 0.75,
      // -0.5, -0.5, -0.25, -0.25,
      // 0.5, 0.5, 1.7, 1.7,
      // 0.5, -0.5, 1.7, -0.2
      -0.5, 0.5, 0.0, 1.0,
      -0.5, -0.5, 0.0, 0.0,
      0.5, 0.5, 1.0, 1.0,
      0.5, -0.5, 1.0, 0.0
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

import convert from 'color-convert'

const floatPrecision = 1000

const roundFloat = number => Math.round(number * floatPrecision) / floatPrecision
const floatFormat = number => (number % 1) ? roundFloat(number) : `${number}.0`

const base = convert.hsv

class Color {
  constructor(h = 0, s = 0, v = 0, a = 1) {
    this.h = h
    this.s = s
    this.v = v
    this.a = a
  }

  toHsl() {
    const [h, s, l] = base.hsl(this.h, this.s, this.v)
    return `hsl(${h}, ${s}%, ${l}%)`
  }

  toHsla() {
    const [h, s, l] = base.hsl(this.h, this.s, this.v)
    return `hsla(${h}, ${s}%, ${l}%, ${roundFloat(this.a)})`
  }

  toVec3() {
    const [r, g, b] = base.rgb(this.h, this.s, this.v)
    return `vec3(${floatFormat(r / 255)}, ${floatFormat(g / 255)}, ${floatFormat(b / 255)})`
  }

  toVec4() {
    const [r, g, b] = base.rgb(this.h, this.s, this.v)
    return `vec4(${floatFormat(r / 255)}, ${floatFormat(g / 255)}, ${floatFormat(b / 255)}, ${floatFormat(this.a)})`
  }

  toRgb() {
    const [r, g, b] = base.rgb(this.h, this.s, this.v)
    return `rgb(${r}, ${g}, ${b})`
  }

  toRgba() {
    const [r, g, b] = base.rgb(this.h, this.s, this.v)
    return `rgba(${r}, ${g}, ${b}, ${roundFloat(this.a)})`
  }

  toHex() {
    return '#' + base.hex(this.h, this.s, this.v).toLowerCase()
  }

  toHexa() {
    const alpha = Math.round(this.a * 0xff)
    return this.toHex() + ((alpha >= 0x10) ? alpha.toString(16) : '0' + alpha.toString(16))
  }
}

// Static methods
Color.fromHSV = (h, s, v, a) => {
  return new Color(h, s, v, a)
}

Color.fromRGB = (r, g, b, a) => {
  const [hue, saturation, value] = convert.rgb.hsv(r, g, b)
  return Color.fromHSV(hue, saturation, value, a)
}

Color.fromHSL = (h, s, l, a) => {
  const [hue, saturation, value] = convert.hsl.hsv(h, s, l)
  return Color.fromHSV(hue, saturation, value, a)
}

export default Color

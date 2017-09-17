import React, {Component} from 'react'
import CopyField from 'components/CopyField'
import Color from 'utils/color'
import HueBox from 'components/HueBox'
import ColorSlider from 'components/ColorSlider'
import autobind from 'autobind-decorator'

const hueGradient = [
  Color.fromRGB(0xff, 0x0, 0x0),
  Color.fromRGB(0xff, 0xff, 0x0),
  Color.fromRGB(0x0, 0xff, 0x0),
  Color.fromRGB(0x0, 0xff, 0xff),
  Color.fromRGB(0x0, 0x0, 0xff),
  Color.fromRGB(0xff, 0x0, 0xff),
  Color.fromRGB(0xff, 0x0, 0x0),
]

export default class Layout extends Component {
  componentWillMount() {
    const previousColor = Color.fromRGB(255, 0, 0, 1) // Red
    const color = Color.fromRGB(255, 0, 0, 1) // Red
    this.setState({color, previousColor})
  }

  @autobind moveCursor(saturation, value) {
    const color = Color.fromHSV(this.state.color.h, saturation * 100, value * 100, this.state.color.a)
    this.setState({color})
  }

  @autobind pickColor(saturation, value) {
    const color = Color.fromHSV(this.state.color.h, saturation * 100, value * 100, this.state.color.a)
    this.setState({color})
  }

  @autobind hueBoxClick() {
    const previousColor = this.state.color
    const color = Color.fromHSV(this.state.color.h, saturation * 100, value * 100, this.state.color.a)
    this.setState({color, previousColor})
  }

  @autobind hueUpdate(value) {
    const current = this.state.color
    const color = Color.fromHSV(value * 360, current.s, current.v, current.a)
    this.setState({color})
  }

  @autobind saturationUpdate(value) {
    const current = this.state.color
    const color = Color.fromHSV(current.h, value * 100, current.v, current.a)
    this.setState({color})
  }

  @autobind valueUpdate(value) {
    const current = this.state.color
    const color = Color.fromHSV(current.h, current.s, value * 100, current.a)
    this.setState({color})
  }

  @autobind alphaUpdate(value) {
    const current = this.state.color
    const color = Color.fromHSV(current.h, current.s, current.v, value)
    this.setState({color})
  }

  @autobind huePick(value) {
    const current = this.state.color
    const color = Color.fromHSV(value * 360, current.s, current.v, current.a)
    this.setState({color})
  }

  @autobind saturationPick(value) {
    const current = this.state.color
    const color = Color.fromHSV(current.h, value * 100, current.v, current.a)
    this.setState({color})
  }

  @autobind valuePick(value) {
    const current = this.state.color
    const color = Color.fromHSV(current.h, current.s, value * 100, current.a)
    this.setState({color})
  }

  @autobind alphaPick(value) {
    const current = this.state.color
    const color = Color.fromHSV(current.h, current.s, current.v, value)
    this.setState({color})
  }

  @autobind restorePreviousColor() {
    const color = this.state.previousColor
    this.setState({color})
  }

  render() {
    const {color, previousColor} = this.state

    return (
      <div className="layout">
        <div className="color-preview__container">
          <div className="color-preview__item" style={{backgroundColor: color.toRgba()}}></div>
          <div className="color-preview__item" onClick={this.restorePreviousColor} style={{backgroundColor: previousColor.toRgba()}}></div>
        </div>

        <HueBox onMouseDown={this.hueBoxClick} onPick={this.pickColor} onUpdate={this.moveCursor} color={color} />

        <div>
          <ColorSlider onPick={this.huePick} onUpdate={this.hueUpdate} value={color.h * 100 / 360} stops={hueGradient} />
          <ColorSlider onPick={this.saturationPick} onUpdate={this.saturationUpdate} value={color.s} stops={[Color.fromHSV(color.h, 0, color.v), Color.fromHSV(color.h, 100, color.v)]} />
          <ColorSlider onPick={this.valuePick} onUpdate={this.valueUpdate} value={color.v} stops={[Color.fromHSV(color.h, color.s, 0), Color.fromHSV(color.h, color.s, 100)]} />
          <ColorSlider onPick={this.alphaPick} onUpdate={this.alphaUpdate} value={color.a * 100} stops={[Color.fromHSV(color.h, color.s, color.v, 0), Color.fromHSV(color.h, color.s, color.v, 1)]} />
        </div>

        <CopyField text={color.toHex()} />
        <CopyField text={color.toHexa()} />
        <CopyField text={color.toHsl()} />
        <CopyField text={color.toHsla()} />
        <CopyField text={color.toRgb()} />
        <CopyField text={color.toRgba()} />
        <CopyField text={color.toVec3()} />
        <CopyField text={color.toVec4()} />
      </div>
    )
  }
}

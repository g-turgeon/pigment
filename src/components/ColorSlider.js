import React, {Component} from 'react'
import autobind from 'autobind-decorator'

let gradientId = 0

export default class ColorSlider extends Component {
  componentWillMount() {
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
    this.setState({gradientId: gradientId++, mouseDown: false})
  }

  getValue(event) {
    const rect = this.refs.mouseArea.getBoundingClientRect()
    return Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
  }

  @autobind handleMouseMove(event) {
    if (this.state.mouseDown && this.props.onUpdate) {
      this.props.onUpdate(this.getValue(event))
    }
  }

  @autobind handleMouseUp(event) {
    if (this.state.mouseDown && this.props.onUpdate) {
      this.props.onUpdate(this.getValue(event))
    }
    this.setState({mouseDown: false})
  }

  @autobind handleMouseDown(event) {
    this.setState({mouseDown: true})

    if (this.props.onUpdate) {
      this.props.onUpdate(this.getValue(event))
    }
  }

  render() {
    const gradientId = this.state.gradientId
    const {value, stops} = this.props

    return (
      <div className="gradient-slider" ref="mouseArea" onMouseDown={this.handleMouseDown}>
        <svg className="gradient-slider__gradient">
          <linearGradient id={'gradient' + gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            {stops.map((color, index) => {
              const position = index / (stops.length - 1)
              return <stop key={index} offset={position * 100 + '%'} stopColor={color.toHex()} stopOpacity={color.a} />
            })}
          </linearGradient>
          <rect width="100%" height="100%" fill={`url(#gradient${gradientId})`} />
        </svg>
        <svg className="gradient-slider__cursor" style={{left: value + '%'}} >
          <use xlinkHref="#slider-cursor" />
        </svg>
      </div>
    )
  }
}

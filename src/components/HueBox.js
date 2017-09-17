import React, {Component} from 'react'

export default class HueBox extends React.Component {
  componentWillMount() {
    document.addEventListener('mousemove', this.handleMouseMove.bind(this))
    document.addEventListener('mouseup', this.handleMouseUp.bind(this))
    this.setState({mouseDown: false})
  }

  getCursorPosition(event) {
    const rect = this.refs.mouseArea.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    const y = 1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
    return {x, y}
  }

  handleMouseDown(event) {
    this.setState({mouseDown: true})

    if (this.props.onMouseDown) {
      this.props.onMouseDown()
    }

    this.handleMouseMove(event)
  }

  handleMouseUp(event) {
    if (this.state.mouseDown) {
      const position = this.getCursorPosition(event)

      if (this.props.onPick) {
        this.props.onPick(position.x, position.y)
      }
    }
    this.setState({mouseDown: false})
  }

  handleMouseMove(event) {
    if (this.state.mouseDown || event.type == 'mousedown') {
      const position = this.getCursorPosition(event)

      if (this.props.onUpdate) {
        this.props.onUpdate(position.x, position.y)
      }
    }
  }

  render() {
    const {color} = this.props

    return (
      <div ref="mouseArea" className="hue-box">
        <svg className="hue-box__gradient" onMouseDown={this.handleMouseDown.bind(this)}>
          <linearGradient id="saturation" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="value" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="1" />
          </linearGradient>

          <rect width="100%" height="100%" fill={`hsl(${color.h}, 100%, 50%)`} />
          <rect width="100%" height="100%" fill="url(#saturation)" />
          <rect width="100%" height="100%" fill="url(#value)" />
        </svg>

        <svg className="hue-box__cursor" style={{left: color.s + '%', top: 100 - color.v + '%'}}>
          <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#fff" opacity="0.9" strokeWidth="3" />
          <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#333" strokeWidth="1" />
        </svg>
      </div>
    )
  }
}

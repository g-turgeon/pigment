import {clipboard} from 'electron'
import React, {Component} from 'react'
import autobind from 'autobind-decorator'
import VectorIcon from 'components/VectorIcon'

export default class CopyField extends Component {
  componentWillMount() {
    this.setState({copied: false})
  }

  @autobind handleClick(event) {
    const text = this.props.text

    clipboard.writeText(text)
    this.setState({copied: true})

    if (this.props.onCopy) {
      this.props.onCopy(text)
    }

    const delay = this.props.delay || 5
    window.setTimeout(() => this.setState({copied: false}), delay * 100)
  }

  render() {
    const text = this.props.text
    const copied = this.state.copied
    return (
      <div data-copied={copied} onClick={this.handleClick} className="copy-field">{text}
        <VectorIcon src="icons.svg" id="checkmark" />
      </div>
    )
  }
}

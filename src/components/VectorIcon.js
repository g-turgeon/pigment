import React from 'react'

export default (props) => {
  const className = props.className || ''
  const id = props.id
  const src = props.src
  return (<svg className={className}><use xlinkHref={src + '#' + id} /></svg>)
}

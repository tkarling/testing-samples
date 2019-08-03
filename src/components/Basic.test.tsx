import React from 'react'
import Basic from './Basic'

import ReactDOM from 'react-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Basic />, div)
  ReactDOM.unmountComponentAtNode(div)
})

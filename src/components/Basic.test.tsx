import React from 'react'
import Basic from './Basic'

import ReactDOM from 'react-dom'

import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Basic />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders without crashing', () => {
  const wrapper = shallow(<Basic />)
  expect(wrapper).toHaveText('Hello')
})

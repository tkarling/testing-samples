import React from 'react'
import Basic from './Basic'

import ReactDOM from 'react-dom'

import { shallow } from 'enzyme'

import { render } from '@testing-library/react'

it('renders without crashing plain', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Basic />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders without crashing enzyme', () => {
  const wrapper = shallow(<Basic />)
  expect(wrapper).toHaveText('Hello')
})

it('renders without crashing @testing-library/react ', () => {
  const { getByText } = render(<Basic />)
  expect(getByText('Hello')).toBeInTheDocument()
})

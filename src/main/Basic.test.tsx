import React from 'react'
import Basic from './Basic'

import ReactDOM from 'react-dom'

import { mount } from 'enzyme'

import { render } from '@testing-library/react'

describe('Basic', () => {
  it('renders without crashing plain', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Basic />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders without crashing enzyme', () => {
    const wrapper = mount(<Basic />)
    expect(wrapper).toHaveText('Hello')
  })

  it('renders without crashing @testing-library/react ', () => {
    const { getByText } = render(<Basic />)
    expect(getByText('Hello')).toBeInTheDocument()
  })
})

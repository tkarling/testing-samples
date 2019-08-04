import React from 'react'
import { shallow } from 'enzyme'
import { getText, click } from '../testHelpers.e'
import WithState, { INITIAL_VALUE } from './WithState'

const setup = () => shallow(<WithState />)
describe('WithState', () => {
  const testId = 'value'

  it('renders initial value', () => {
    const wrapper = setup()
    expect(getText(wrapper, testId)).toContain(INITIAL_VALUE)
  })

  it('can increment', () => {
    const wrapper = setup()
    click(wrapper, testId)
    expect(getText(wrapper, testId)).toContain(INITIAL_VALUE + 1)
  })
})

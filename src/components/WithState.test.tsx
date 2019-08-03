import React from 'react'
import { shallow } from 'enzyme'
import { get, click } from '../testHelpers'
import WithState, { INITIAL_VALUE } from './WithState'

const setup = () => shallow(<WithState />)
describe('WithState', () => {
  const testId = 'value'

  it('renders initial value', () => {
    const wrapper = setup()
    expect(get(wrapper, testId)).toContain(INITIAL_VALUE)
  })

  it('can increment', () => {
    const wrapper = setup()
    click(wrapper, testId)
    expect(get(wrapper, testId)).toContain(INITIAL_VALUE + 1)
  })
})

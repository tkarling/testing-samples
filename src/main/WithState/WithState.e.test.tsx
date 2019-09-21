import React from 'react'
import { mount, getText, click } from '../../testHelpers.e'
import WithState, { INITIAL_COUNTER } from './WithState'

const setup = () => mount(<WithState />)
describe('WithState', () => {
  const testId = 'counter'

  it('renders initial value', () => {
    const wrapper = setup()
    expect(getText(wrapper, testId)).toContain(INITIAL_COUNTER)
  })

  it('can increment', () => {
    const wrapper = setup()
    click(wrapper, testId)
    expect(getText(wrapper, testId)).toContain(INITIAL_COUNTER + 1)
  })
})

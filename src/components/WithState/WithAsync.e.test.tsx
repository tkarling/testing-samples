import React from 'react'
import { mount } from 'enzyme'
import { getElement, getText } from '../../testHelpers.e'
import WithAsync from './WithAsync'

const mockExpectedValue = 6
jest.mock('../../api/service', () => {
  return { getValue: jest.fn(() => Promise.resolve(mockExpectedValue)) }
})

const setup = () => mount(<WithAsync />)
describe('WithAsync', () => {
  const valueId = 'value'
  const loadingId = 'loading'

  it('renders Loading before fetch', () => {
    expect.assertions(2)
    const wrapper = setup()
    expect(getText(wrapper, loadingId)).toContain('Loading')
    expect(getElement(wrapper, valueId)).not.toExist()
  })

  it('renders async value', async () => {
    expect.assertions(1)
    const wrapper = await setup()
    await wrapper.update()
    expect(getText(wrapper, valueId)).toContain(mockExpectedValue)
  })
})

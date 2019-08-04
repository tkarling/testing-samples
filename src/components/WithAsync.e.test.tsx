import React from 'react'
import { mount } from 'enzyme'
import { getElement, getText, click } from '../testHelpers.e'
import WithAsync from './WithAsync'
import * as api from '../api/service'
import { act } from '@testing-library/react'

const mockExpectedValue = 6
jest.mock('../api/service', () => {
  return { getValue: jest.fn(() => Promise.resolve(mockExpectedValue)) }
})

const setup = () => mount(<WithAsync />)
describe('WithAsync', () => {
  const valueId = 'value'
  const loadingId = 'loading'

  it('renders Loading before fetch', () => {
    const wrapper = setup()
    expect(getText(wrapper, loadingId)).toContain('Loading')
    expect(getElement(wrapper, valueId)).not.toExist()
  })

  it('renders async value', async () => {
    const wrapper = await setup()
    await wrapper.update()
    expect(getText(wrapper, valueId)).toContain(mockExpectedValue)
  })
})

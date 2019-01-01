import React from 'react'
import { mount } from 'enzyme'
import { getElement, getText, click } from '../../testHelpers.e'
import WithAsyncState from './WithAsyncState'
import WithContextAsyncState from './WithContextAsyncState'

const mockExpectedCounter = 6
jest.mock('../../api/service', () => {
  return {
    api1: { getCounter: jest.fn(() => Promise.resolve(mockExpectedCounter)) },
    api2: { getCounter: jest.fn(() => Promise.resolve(mockExpectedCounter)) }
  }
})
;['WithAsyncState', 'WithContextAsyncState'].forEach(componentName => {
  const setup = () =>
    mount(
      componentName === 'WithAsyncState' ? (
        <WithAsyncState />
      ) : (
        <WithContextAsyncState />
      )
    )
  describe(componentName, () => {
    const counterId = 'counter'
    const loadingId = 'loading'

    it('renders Loading before fetch', () => {
      expect.assertions(2)
      const wrapper = setup()
      expect(getText(wrapper, loadingId)).toContain('Loading')
      expect(getElement(wrapper, counterId)).not.toExist()
    })

    it('renders async counter', async () => {
      expect.assertions(1)
      const wrapper = await setup()
      await wrapper.update()
      expect(getText(wrapper, counterId)).toContain(mockExpectedCounter)
    })

    it('can increment', async () => {
      const wrapper = await setup()
      await wrapper.update()
      click(wrapper, counterId)
      await wrapper.update()
      expect(getText(wrapper, counterId)).toContain(mockExpectedCounter + 1)
    })
  })
})

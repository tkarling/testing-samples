import React from 'react'
import { mount } from 'enzyme'
import { getElement, getText, click } from '../../testHelpers.e'
import WithAsyncState from './WithAsyncState'
import WithContextAsyncState from './WithContextAsyncStateProvider'

const mockExpectedCounter = 6
jest.mock('../../api/service', () => {
  return {
    api1: {
      getCounter: jest.fn(() => Promise.resolve(mockExpectedCounter)),
      setCounter: jest.fn(counter => Promise.resolve(counter))
    },
    api2: {
      getCounter: jest.fn(() => Promise.resolve(mockExpectedCounter)),
      setCounter: jest.fn(counter => Promise.resolve(counter))
    }
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
    const containerId = 'container'
    const counterId = 'counter'

    it('renders Spinning before fetch', () => {
      expect.assertions(2)
      const wrapper = setup()
      expect(getText(wrapper, containerId)).toContain('Spinning')
      expect(getElement(wrapper, counterId)).not.toExist()
    })

    it('renders async counter', async () => {
      expect.assertions(1)
      const wrapper = setup()
      await wrapper.update()
      await wrapper.update()
      expect(getText(wrapper, counterId)).toContain(mockExpectedCounter)
    })

    it('can increment', async () => {
      const wrapper = setup()
      await wrapper.update()
      await wrapper.update()

      click(wrapper, counterId)
      expect(getText(wrapper, containerId)).toContain('Spinning')

      await wrapper.update()
      await wrapper.update()
      expect(getText(wrapper, counterId)).toContain(mockExpectedCounter + 1)
    })
  })
})

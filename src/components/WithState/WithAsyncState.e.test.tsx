import React from 'react'
import { mount } from 'enzyme'
import { getElement, getText, click } from '../../testHelpers.e'
import WithAsyncState from './WithAsyncState'
import WithContextAsyncState from './WithContextAsyncState'

const mockExpectedValue = 6
jest.mock('../../api/service', () => {
  return { getValue: jest.fn(() => Promise.resolve(mockExpectedValue)) }
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

    it('can increment', async () => {
      const wrapper = await setup()
      await wrapper.update()
      click(wrapper, valueId)
      await wrapper.update()
      expect(getText(wrapper, valueId)).toContain(mockExpectedValue + 1)
    })
  })
})

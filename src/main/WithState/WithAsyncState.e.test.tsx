import React from 'react'
import { mount } from 'enzyme'
import {
  callSetImmediate,
  getElement,
  getText,
  click
} from '../../testHelpers.e'

import WithAsyncState from './WithAsyncState'
import WithContextAsyncState from './WithContextAsyncStateProvider'
import WithRenderProp from './WithRenderProp'

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

const containerId = 'container'
const counterId = 'counter'
const waitCounterValue2 = async (wrapper: any, expectedValue: number) => {
  expect(getText(wrapper, containerId)).toContain('Spinning')

  await callSetImmediate()
  wrapper.update()
  expect(getText(wrapper, counterId)).toContain(expectedValue)
}
;['WithAsyncState', 'WithContextAsyncState', 'WithRenderProp'].forEach(
  componentName => {
    const setup = () =>
      mount(
        componentName === 'WithAsyncState' ? (
          <WithAsyncState />
        ) : WithContextAsyncState ? (
          <WithContextAsyncState />
        ) : (
          <WithRenderProp />
        )
      )
    describe(componentName, () => {
      it('renders Spinning before fetch', () => {
        expect.assertions(2)
        const wrapper = setup()
        expect(getText(wrapper, containerId)).toContain('Spinning')
        expect(getElement(wrapper, counterId)).not.toExist()
      })

      it('renders async counter', async () => {
        expect.assertions(2)
        const wrapper = setup()
        await waitCounterValue2(wrapper, mockExpectedCounter)
      })

      it('can increment', async () => {
        expect.assertions(4)
        const wrapper = setup()
        await waitCounterValue2(wrapper, mockExpectedCounter)

        click(wrapper, counterId)
        await waitCounterValue2(wrapper, mockExpectedCounter + 1)
      })
    })
  }
)

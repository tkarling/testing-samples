import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'

import WithAsyncState from './WithAsyncState'
import WithContextAsyncState from './WithContextAsyncStateProvider'
import WithRenderProp from './WithRenderProp'

const mockExpectedCounter = 6
jest.mock('../../api/counterService', () => ({
  getCounter: jest.fn(storeId => Promise.resolve(mockExpectedCounter)),
  setCounter: jest.fn((storeId, counter) => Promise.resolve(counter))
}))

const containerId = 'container'
const counterId = 'counter'
const waitCounterValue2 = async (getByTestId: any, expectedValue: number) => {
  expect(getByTestId(containerId)).toHaveTextContent('Spinning...')
  const counterText = await waitForElement(
    () => getByTestId(counterId).textContent
  )
  expect(counterText).toContain(expectedValue)
}
;['WithAsyncState', 'WithContextAsyncState', 'WithRenderProp'].forEach(
  componentName => {
    const setup = () =>
      render(
        componentName === 'WithAsyncState' ? (
          <WithAsyncState />
        ) : WithContextAsyncState ? (
          <WithContextAsyncState />
        ) : (
          <WithRenderProp />
        )
      )

    describe(componentName, () => {
      describe('find by testId', () => {
        it('renders Spinning before fetch', () => {
          expect.assertions(2)
          const { getByTestId, queryByTestId } = setup()
          expect(getByTestId(containerId)).toHaveTextContent('Spinning...')
          expect(queryByTestId(counterId)).toBeNull()
        })

        it('renders async counter', async () => {
          expect.assertions(2)
          const { getByTestId } = setup()
          await waitCounterValue2(getByTestId, mockExpectedCounter)
        })

        it('can increment', async () => {
          expect.assertions(4)
          const { getByTestId } = setup()
          await waitCounterValue2(getByTestId, mockExpectedCounter)

          fireEvent.click(getByTestId(counterId))
          await waitCounterValue2(getByTestId, mockExpectedCounter + 1)
        })
      })
    })
  }
)

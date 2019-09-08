import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'

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

const loadingId = 'loading'
const counterId = 'counter'
const waitCounterValue2 = async (getByTestId: any, expectedValue: number) => {
  expect(getByTestId(loadingId)).toHaveTextContent('Spinning...')
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
          expect(getByTestId(loadingId)).toHaveTextContent('Spinning...')
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

      describe('find by text', () => {
        it('renders Spinning before fetch', () => {
          const { getByText, queryByText } = setup()
          expect(getByText(/Spinning/).textContent).toContain('Spinning')
          expect(queryByText(/Counter/)).toBeNull()
        })

        it('renders async counter', async () => {
          const { getByText, queryByText } = setup()
          const counterEl = await waitForElement(() => getByText(/Counter/))
          expect(counterEl.textContent).toContain(mockExpectedCounter)
          expect(queryByText(/Spinning/)).toBeNull()
        })
      })
    })
  }
)

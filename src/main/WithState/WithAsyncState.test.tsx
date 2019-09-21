import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import WithAsyncState from './WithAsyncState'
import WithContextAsyncState from './WithContextAsyncStateProvider'
import WithRenderProp from './WithRenderProp'

const mockExpectedCounter = 6
jest.mock('../../api/counterService', () => ({
  getCounter: jest.fn(storeId => Promise.resolve(mockExpectedCounter)),
  setCounter: jest.fn((storeId, counter) => Promise.resolve(counter))
}))

const containerTestId = 'container'
const counterTestId = 'counter'
const expectAsyncValue = async (
  { getByTestId, findByTestId }: { getByTestId: any; findByTestId: any },
  expectedValue: number
) => {
  expect(getByTestId(containerTestId)).toHaveTextContent('Spinning...')
  const counter = await findByTestId(containerTestId)
  expect(counter.textContent).toContain(expectedValue + '')
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
          expect(getByTestId(containerTestId)).toHaveTextContent('Spinning...')
          expect(queryByTestId(counterTestId)).toBeNull()
        })

        it('renders async counter', async () => {
          expect.assertions(2)
          const { getByTestId, findByTestId } = setup()
          await expectAsyncValue(
            { getByTestId, findByTestId },
            mockExpectedCounter
          )
        })

        it('can increment', async () => {
          expect.assertions(4)
          const { getByTestId, findByTestId } = setup()
          await expectAsyncValue(
            { getByTestId, findByTestId },
            mockExpectedCounter
          )

          fireEvent.click(getByTestId(counterTestId))
          await expectAsyncValue(
            { getByTestId, findByTestId },
            mockExpectedCounter + 1
          )
        })
      })
    })
  }
)

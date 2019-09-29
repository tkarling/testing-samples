import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import WithAsyncState from './WithAsyncState'
import WithContextAsyncState from './WithContextAsyncStateProvider'
import WithRenderProp from './WithRenderProp'

import { mockExpectedCounter } from '../../api/__mocks__/counterService'
jest.mock('../../api/counterService')

const containerTestId = 'container'
const counterTestId = 'counter'
const expectAsyncValue = async (
  { getByTestId, findAllByText }: { getByTestId: any; findAllByText: any },
  expectedValue: number
) => {
  expect(getByTestId(containerTestId)).toHaveTextContent('Spinning...')
  expect(
    (await findAllByText(expectedValue + '', { exact: false })).length
  ).toBeGreaterThan(0) // WithContextAsyncState has 2 copies of the counter
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
          const { getByTestId, findAllByText } = setup()
          await expectAsyncValue(
            { getByTestId, findAllByText },
            mockExpectedCounter
          )
        })

        it('can increment', async () => {
          expect.assertions(4)
          const { getByTestId, findAllByText } = setup()
          await expectAsyncValue(
            { getByTestId, findAllByText },
            mockExpectedCounter
          )

          fireEvent.click(getByTestId(counterTestId))
          await expectAsyncValue(
            { getByTestId, findAllByText },
            mockExpectedCounter + 1
          )
        })
      })
    })
  }
)

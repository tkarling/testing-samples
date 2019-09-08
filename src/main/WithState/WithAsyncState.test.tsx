import React from 'react'
import WithAsyncState from './WithAsyncState'
import { api1 as api } from '../../api/service'
import { render, waitForElement, fireEvent, wait } from '@testing-library/react'

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

const setup = () => render(<WithAsyncState />)

const loadingId = 'loading'
const counterId = 'counter'
const waitCounterValue2 = async (getByTestId: any, expectedValue: number) => {
  expect(getByTestId(loadingId)).toHaveTextContent('Spinning...')
  const counterText = await waitForElement(
    () => getByTestId(counterId).textContent
  )
  expect(counterText).toContain(expectedValue)
}

describe('WithAsyncState', () => {
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

    it('renders async counter after fetch w custom counter', async () => {
      const EXPECTED_COUNTER2 = 15
      api.getCounter = jest.fn().mockResolvedValueOnce(EXPECTED_COUNTER2)

      const { getByText } = setup()
      const counterEl = await waitForElement(() => getByText(/Counter/))
      expect(counterEl.textContent).toContain(EXPECTED_COUNTER2)
    })
  })
})

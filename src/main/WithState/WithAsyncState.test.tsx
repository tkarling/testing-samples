import React from 'react'
import WithAsyncState from './WithAsyncState'
import { api1 as api } from '../../api/service'
import { render, act, waitForElement, cleanup } from '@testing-library/react'

const setup = () => render(<WithAsyncState />)
describe('WithAsyncState', () => {
  const EXPECTED_COUNTER = 42
  beforeEach(() => {
    api.getCounter = jest.fn().mockResolvedValueOnce(EXPECTED_COUNTER)
  })

  describe('find by text', () => {
    it('renders Loading before fetch', () => {
      const { getByText, queryByText } = setup()
      expect(getByText(/Loading/).textContent).toContain('Loading')
      expect(queryByText(/Counter/)).toBeNull()
    })

    it('renders async counter after fetch', async () => {
      const { getByText, queryByText } = setup()
      const counterEl = await waitForElement(() => getByText(/Counter/))
      expect(counterEl.textContent).toContain(EXPECTED_COUNTER)
      expect(queryByText(/Loading/)).toBeNull()
    })

    it('renders async counter after fetch w custom counter', async () => {
      const EXPECTED_COUNTER2 = 15
      api.getCounter = jest.fn().mockResolvedValueOnce(EXPECTED_COUNTER2)

      const { getByText } = setup()
      const counterEl = await waitForElement(() => getByText(/Counter/))
      expect(counterEl.textContent).toContain(EXPECTED_COUNTER2)
    })
  })

  describe('find by testId', () => {
    const loadingId = 'loading'
    const counterId = 'counter'

    it('renders Loading before fetch', () => {
      const { getByTestId, queryByTestId } = setup()
      expect(getByTestId(loadingId)).toHaveTextContent('Loading...')
      expect(queryByTestId(counterId)).toBeNull()
    })

    it('renders async counter after fetch', async () => {
      const { getByTestId } = setup()
      const counterText = await waitForElement(
        () => getByTestId(counterId).textContent
      )
      expect(counterText).toContain(EXPECTED_COUNTER)
    })
  })
})

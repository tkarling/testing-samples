import React from 'react'
import WithAsync from './WithAsync'
import * as api from '../../api/service'
import { render, act, waitForElement, cleanup } from '@testing-library/react'

const setup = () => render(<WithAsync />)
describe('WithAsync', () => {
  const EXPECTED_VALUE = 42
  beforeEach(() => {
    api.getValue = jest.fn().mockResolvedValueOnce(EXPECTED_VALUE)
  })

  describe('find by text', () => {
    it('renders Loading before fetch', () => {
      const { getByText, queryByText } = setup()
      expect(getByText(/Loading/).textContent).toContain('Loading')
      expect(queryByText(/Value/)).toBeNull()
    })

    it('renders async value after fetch', async () => {
      const { getByText, queryByText } = setup()
      const valueEl = await waitForElement(() => getByText(/Value/))
      expect(valueEl.textContent).toContain(EXPECTED_VALUE)
      expect(queryByText(/Loading/)).toBeNull()
    })

    it('renders async value after fetch w custom value', async () => {
      const EXPECTED_VALUE2 = 15
      api.getValue = jest.fn().mockResolvedValueOnce(EXPECTED_VALUE2)

      const { getByText } = setup()
      const valueEl = await waitForElement(() => getByText(/Value/))
      expect(valueEl.textContent).toContain(EXPECTED_VALUE2)
    })
  })

  describe('find by testId', () => {
    const loadingId = 'loading'
    const valueId = 'value'

    it('renders Loading before fetch', () => {
      const { getByTestId, queryByTestId } = setup()
      expect(getByTestId(loadingId)).toHaveTextContent('Loading...')
      expect(queryByTestId(valueId)).toBeNull()
    })

    it('renders async value after fetch', async () => {
      const { getByTestId } = setup()
      const valueText = await waitForElement(
        () => getByTestId(valueId).textContent
      )
      expect(valueText).toContain(EXPECTED_VALUE)
    })
  })
})

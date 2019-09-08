import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import WithState, { INITIAL_COUNTER } from './WithState'

const setup = () => render(<WithState />)
describe('WithState', () => {
  const testId = 'counter'

  it('renders initial value', () => {
    const { getByTestId } = setup()
    expect(getByTestId(testId)).toHaveTextContent(INITIAL_COUNTER + '')
  })

  it('can increment', () => {
    const { getByTestId } = setup()
    fireEvent.click(getByTestId(testId))
    expect(getByTestId(testId)).toHaveTextContent(INITIAL_COUNTER + 1 + '')
  })
})

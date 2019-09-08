import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { TEXT, TEST_ID } from './components/Common'
import WithReducer from './WithReducer'

const setup = () => render(<WithReducer />)
describe('WithState', () => {
  let getByTestId: any
  beforeEach(() => {
    getByTestId = setup().getByTestId
  })
  it('renders initial value', () => {
    expect(getByTestId(TEST_ID.container)).toHaveTextContent(TEXT.noItems)
  })

  it('can add Item', () => {
    fireEvent.click(getByTestId(TEST_ID.addButton))
    expect(getByTestId(TEST_ID.container)).toHaveTextContent(TEXT.itemTitleBase)
  })

  describe('with one item created', () => {
    beforeEach(() => {
      fireEvent.click(getByTestId(TEST_ID.addButton))
      expect(getByTestId(TEST_ID.container)).toHaveTextContent(
        TEXT.itemTitleBase
      )
    })
    it('can toggle checked status', () => {
      expect(getByTestId(TEST_ID.toggleCheck).checked).toBe(false)

      // toggle completed to true
      fireEvent.click(getByTestId(TEST_ID.toggleCheck))
      expect(getByTestId(TEST_ID.toggleCheck).checked).toBe(true)

      // toggle completed back to false
      fireEvent.click(getByTestId(TEST_ID.toggleCheck))
      expect(getByTestId(TEST_ID.toggleCheck).checked).toBe(false)
    })

    it('can delete Item', () => {
      fireEvent.click(getByTestId(TEST_ID.deleteButton))
      expect(getByTestId(TEST_ID.container)).toHaveTextContent(TEXT.noItems)
    })
  })
})

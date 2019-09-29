import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { TEXT, TEST_ID } from './components/Common'
import WithAsyncReducer from './WithAsyncReducer'
import WithContextAsyncReducer from './WithContextAsyncReducerProvider'

import api from '../../api/todosService'
import {
  mockTodosInitial,
  mockTodosAfterAdd,
  mockTodosAfterToTrue,
  mockTodosAfterToFalse
} from '../../api/__mocks__/todosService'
jest.mock('../../api/todosService')

const expectAsyncTexts = async (
  { getByTestId, findByText }: any,
  texts: string[]
) => {
  expect(getByTestId(TEST_ID.container)).toHaveTextContent(TEXT.spinning)
  for (const text of texts) {
    expect(await findByText(text)).toBeDefined()
  }
}
;['WithAsyncReducer', 'WithContextAsyncReducer'].forEach(componentName => {
  const setup = () =>
    render(
      componentName === 'WithAsyncState' ? (
        <WithAsyncReducer />
      ) : (
        <WithContextAsyncReducer />
      )
    )
  describe(componentName, () => {
    it('renders spinning before fetch', () => {
      expect.assertions(1)
      const { getByTestId } = setup()
      expect(getByTestId(TEST_ID.container)).toHaveTextContent(TEXT.spinning)
    })

    describe('After initial Fetch', () => {
      let getByTestId: any
      let findByTestId: any
      let findByText: any
      beforeEach(async () => {
        ;({ getByTestId, findByTestId, findByText } = setup())
        await expectAsyncTexts(
          { getByTestId, findByText },
          mockTodosInitial.map(item => item.title)
        )
      })

      it('renders initial todos', async () => {
        expect.assertions(2)
        // all checks are in before each
      })

      it('can add Item', async () => {
        expect.assertions(2 + 3)
        fireEvent.click(getByTestId(TEST_ID.addButton))
        await expectAsyncTexts(
          { getByTestId, findByText },
          mockTodosAfterAdd.map(item => item.title)
        )
      })

      it('can toggle checked status', async () => {
        const setupMock = (value: any) => {
          api.toggleTodo = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve(value)
          })
        }
        const toggleCheckboxAndExpectAsyncValue = async (
          {
            getByTestId,
            findByTestId
          }: { getByTestId: any; findByTestId: any },
          toValue: boolean
        ) => {
          setupMock(toValue ? mockTodosAfterToTrue : mockTodosAfterToFalse)
          fireEvent.click(getByTestId(TEST_ID.toggleCheck))
          expect(getByTestId(TEST_ID.container)).toHaveTextContent(
            TEXT.spinning
          )
          const checkboxAfterClick = await findByTestId(TEST_ID.toggleCheck)
          expect(checkboxAfterClick.checked).toBe(toValue)
        }

        expect.assertions(2 + 1 + 2 + 2)
        expect(getByTestId(TEST_ID.toggleCheck).checked).toBe(false)

        await toggleCheckboxAndExpectAsyncValue(
          { getByTestId, findByTestId },
          true
        )
        await toggleCheckboxAndExpectAsyncValue(
          { getByTestId, findByTestId },
          true
        )
      })

      it('can delete Item', async () => {
        expect.assertions(2 + 2)

        fireEvent.click(getByTestId(TEST_ID.deleteButton))
        await expectAsyncTexts({ getByTestId, findByText }, [TEXT.noItems])
      })
    })
  })
})

import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'
import { TEXT, TEST_ID } from './components/Common'
import WithAsyncReducer from './WithAsyncReducer'
import WithContextAsyncReducer from './WithContextAsyncReducer'
import { api1, api2 } from '../../api/service'

const TITLE = 'moi'
const TITLE2 = 'joo'
const TODO = {
  id: '1',
  title: TITLE,
  completed: false
}
const ADDED_TODO = {
  id: '3',
  title: TITLE2,
  completed: false
}

const mockTodosInitial = [TODO]
const mockTodosAfterAdd = [ADDED_TODO, TODO]
const mockTodosAfterToggle = [{ ...TODO, completed: true }]
const mockTodosAfterSecondToggle = [{ ...TODO, completed: false }]
jest.mock('../../api/service', () => {
  return {
    api1: {
      getTodos: jest.fn(() => Promise.resolve(mockTodosInitial)),
      addTodo: jest.fn(() => Promise.resolve(mockTodosAfterAdd)),
      // toggleTodo: jest.fn(() => Promise.resolve(mockTodosAfterSecondToggle)),
      deleteTodo: jest.fn(() => Promise.resolve([]))
    },
    api2: {
      getTodos: jest.fn(() => Promise.resolve(mockTodosInitial)),
      addTodo: jest.fn(() => Promise.resolve(mockTodosAfterAdd)),
      // toggleTodo: jest.fn(() => Promise.resolve(mockTodosAfterSecondToggle)),
      deleteTodo: jest.fn(() => Promise.resolve([]))
    }
  }
})

const expectTexts = async (
  { getByTestId, getByText }: any,
  texts: string[]
) => {
  await waitForElement(() => getByText(texts[texts.length - 1]).textContent)
  texts.forEach(async expectedText => {
    expect(getByTestId(TEST_ID.container)).toHaveTextContent(expectedText)
  })
}
;['WithAsyncReducer', 'WithContextAsyncReducer'].forEach(componentName => {
  const api = componentName === 'WithAsyncReducer' ? api2 : api2
  const setup = () =>
    render(
      componentName === 'WithAsyncState' ? (
        <WithAsyncReducer />
      ) : (
        <WithContextAsyncReducer />
      )
    )
  describe(componentName, () => {
    it('renders Spinning before fetch', () => {
      expect.assertions(1)
      const { getByTestId } = setup()
      expect(getByTestId(TEST_ID.container)).toHaveTextContent('Spinning')
    })

    describe('After initial Fetch', () => {
      let getByTestId: any
      let getByText: any
      beforeEach(async () => {
        ;({ getByTestId, getByText } = setup())
        expect(getByTestId(TEST_ID.container)).toHaveTextContent('Spinning')
        await expectTexts(
          { getByTestId, getByText },
          mockTodosInitial.map(item => item.title)
        )
      })

      it('renders initial todos', async () => {
        expect.assertions(2)
        // all checks are in before each
      })

      it('can add Item', async () => {
        expect.assertions(2 + 1 + 2)
        fireEvent.click(getByTestId(TEST_ID.addButton))
        expect(getByTestId(TEST_ID.container)).toHaveTextContent('Spinning')

        await expectTexts(
          { getByTestId, getByText },
          mockTodosAfterAdd.map(item => item.title)
        )
      })

      it('can toggle checked status', async () => {
        function setupMock(myApi: any, value: any) {
          myApi.toggleTodo = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve(value)
          })
        }

        expect.assertions(2 + 1 + 2 + 2)
        expect(getByTestId(TEST_ID.toggleCheck).checked).toBe(false)

        // toggle completed to true
        setupMock(api, mockTodosAfterToggle)
        fireEvent.click(getByTestId(TEST_ID.toggleCheck))
        expect(getByTestId(TEST_ID.container)).toHaveTextContent('Spinning')
        const checkedAfterClick = await waitForElement(() =>
          getByTestId(TEST_ID.toggleCheck)
        )
        expect(checkedAfterClick.checked).toBe(true)

        // toggle completed back to false
        setupMock(api, mockTodosAfterSecondToggle)
        fireEvent.click(getByTestId(TEST_ID.toggleCheck))
        expect(getByTestId(TEST_ID.container)).toHaveTextContent('Spinning')
        const checkedAfterTwoClicks = await waitForElement(() =>
          getByTestId(TEST_ID.toggleCheck)
        )
        expect(checkedAfterTwoClicks.checked).toBe(false)
      })

      it('can delete Item', async () => {
        expect.assertions(2 + 1 + 1)

        fireEvent.click(getByTestId(TEST_ID.deleteButton))
        expect(getByTestId(TEST_ID.container)).toHaveTextContent('Spinning')
        await expectTexts({ getByTestId, getByText }, [TEXT.noItems])
      })
    })
  })
})

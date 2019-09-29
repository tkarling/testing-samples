import React from 'react'
import {
  mount,
  callSetImmediate,
  getElement,
  click,
  toggleCheck,
  expectTexts
} from '../../testHelpers.e'
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

const expectAsyncTexts = async (wrapper: any, texts: string[]) => {
  expectTexts(wrapper, [TEXT.spinning])
  await callSetImmediate()
  wrapper.update()
  expectTexts(wrapper, texts)
}
;['WithAsyncReducer', 'WithContextAsyncReducer'].forEach(componentName => {
  const setup = () =>
    mount(
      componentName === 'WithAsyncState' ? (
        <WithAsyncReducer />
      ) : (
        <WithContextAsyncReducer />
      )
    )
  describe(componentName, () => {
    it('renders Spinning before fetch', () => {
      expect.assertions(1)
      const wrapper = setup()
      expectTexts(wrapper, [TEXT.spinning])
    })

    describe('After initial Fetch', () => {
      let wrapper: any
      beforeEach(async () => {
        wrapper = setup()
        await expectAsyncTexts(
          wrapper,
          mockTodosInitial.map(item => item.title)
        )
      })

      it('renders initial todos', () => {
        expect.assertions(2)
        // all checks are in before each
      })

      it('can add Item', async () => {
        expect.assertions(2 + 3)
        click(wrapper, TEST_ID.addButton)
        await expectAsyncTexts(
          wrapper,
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
          wrapper: any,
          toValue: boolean
        ) => {
          setupMock(toValue ? mockTodosAfterToTrue : mockTodosAfterToFalse)
          toggleCheck(wrapper, TEST_ID.toggleCheck)
          expectTexts(wrapper, [TEXT.spinning])

          await callSetImmediate()
          wrapper.update()
          const cb = getElement(wrapper, TEST_ID.toggleCheck)
          if (toValue) {
            expect(cb).toBeChecked()
          } else {
            expect(cb).not.toBeChecked()
          }
        }
        expect.assertions(2 + 1 + 2 + 2)
        expect(getElement(wrapper, TEST_ID.toggleCheck)).not.toBeChecked()

        await toggleCheckboxAndExpectAsyncValue(wrapper, true)
        await toggleCheckboxAndExpectAsyncValue(wrapper, false)
      })

      it('can delete Item', async () => {
        expect.assertions(2 + 2)

        click(wrapper, TEST_ID.deleteButton)
        await expectAsyncTexts(wrapper, [TEXT.noItems])
      })
    })
  })
})

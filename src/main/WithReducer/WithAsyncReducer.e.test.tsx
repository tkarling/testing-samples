import React from 'react'
import { mount } from 'enzyme'
import { getElement, getText, click, toggleCheck } from '../../testHelpers.e'
import { TEXT, TEST_ID } from './components/Common'
import WithAsyncReducer from './WithAsyncReducer'
import WithContextAsyncReducer from './WithContextAsyncReducer'

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
jest.mock('../../api/service', () => {
  return {
    api1: {
      getTodos: jest.fn(() => Promise.resolve(mockTodosInitial)),
      addTodo: jest.fn(() => Promise.resolve(mockTodosAfterAdd)),
      toggleTodo: jest.fn(() => Promise.resolve(mockTodosAfterToggle)),
      deleteTodo: jest.fn(() => Promise.resolve([]))
    },
    api2: {
      getTodos: jest.fn(() => Promise.resolve(mockTodosInitial)),
      addTodo: jest.fn(() => Promise.resolve(mockTodosAfterAdd)),
      toggleTodo: jest.fn(() => Promise.resolve(mockTodosAfterToggle)),
      deleteTodo: jest.fn(() => Promise.resolve([]))
    }
  }
})

const expectToContain = (wrapper: any, texts: string[]) =>
  texts.forEach(text =>
    expect(getText(wrapper, TEST_ID.container)).toContain(text)
  )
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
      expect(getText(wrapper, TEST_ID.container)).toContain('Spinning')
    })

    describe('After initial Fetch', () => {
      let wrapper: any
      beforeEach(async () => {
        wrapper = await setup()
        await wrapper.update()
      })

      it('renders initial todos', () => {
        expect.assertions(1)
        expectToContain(wrapper, mockTodosInitial.map(item => item.title))
      })

      it('can add Item', async () => {
        expect.assertions(3)
        click(wrapper, TEST_ID.addButton)
        expect(getText(wrapper, TEST_ID.container)).toContain('Spinning')
        await wrapper.update()
        expectToContain(wrapper, mockTodosAfterAdd.map(item => item.title))
      })

      it('can toggle checked status', async () => {
        expect.assertions(5)
        expect(getElement(wrapper, TEST_ID.toggleCheck)).not.toBeChecked()

        // toggle completed to true
        toggleCheck(wrapper, TEST_ID.toggleCheck)
        expect(getText(wrapper, TEST_ID.container)).toContain('Spinning')
        await wrapper.update()
        await wrapper.update()
        expect(getElement(wrapper, TEST_ID.toggleCheck)).toBeChecked()

        // toggle completed back to false
        toggleCheck(wrapper, TEST_ID.toggleCheck)
        expect(getText(wrapper, TEST_ID.container)).toContain('Spinning')
        await wrapper.update()
        expect(getElement(wrapper, TEST_ID.toggleCheck)).not.toBeChecked()
      })

      it('can delete Item', async () => {
        expect.assertions(2)
        click(wrapper, TEST_ID.deleteButton)
        expect(getText(wrapper, TEST_ID.container)).toContain('Spinning')
        await wrapper.update()
        expect(getText(wrapper, TEST_ID.container)).toContain(TEXT.noItems)
      })
    })
  })
})

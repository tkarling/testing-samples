import React from 'react'
import { mount } from 'enzyme'
import { getElement, getText, click, toggleCheck } from '../testHelpers.e'
import { TEXT, TEST_ID } from './Common'
import WithAsyncReducer from './WithAsyncReducer'

const TITLE = 'moi'
const TITLE2 = 'hei'
const TITLE3 = 'joo'
const TODO = {
  id: '1',
  title: TITLE,
  completed: false
}
const TODO2 = {
  id: '2',
  title: TITLE2,
  completed: false
}
const ADDED_TODO = {
  id: '3',
  title: TITLE3,
  completed: false
}

const mockTodosInitial = [TODO]
const mockTodosAfterAdd = [ADDED_TODO, TODO]
const mockTodosAfterToggle = [{ ...TODO, completed: true }]
jest.mock('../api/service', () => {
  return {
    getTodos: jest.fn(() => Promise.resolve(mockTodosInitial)),
    addTodo: jest.fn(() => Promise.resolve(mockTodosAfterAdd)),
    toggleTodo: jest.fn(() => Promise.resolve(mockTodosAfterToggle)),
    deleteTodo: jest.fn(() => Promise.resolve([]))
  }
})

const expectToContain = (wrapper: any, texts: string[]) =>
  texts.forEach(text =>
    expect(getText(wrapper, TEST_ID.container)).toContain(text)
  )

const setup = () => mount(<WithAsyncReducer />)
describe('WithAsyncReducer', () => {
  it('renders Loading before fetch', () => {
    expect.assertions(1)
    const wrapper = setup()
    expect(getText(wrapper, TEST_ID.container)).toContain('Loading')
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
      expect(getText(wrapper, TEST_ID.container)).toContain('Loading')
      await wrapper.update()
      expectToContain(wrapper, mockTodosAfterAdd.map(item => item.title))
    })

    it('can toggle checked status', async () => {
      expect.assertions(5)
      expect(getElement(wrapper, TEST_ID.toggleCheck)).not.toBeChecked()

      // toggle completed to true
      toggleCheck(wrapper, TEST_ID.toggleCheck)
      expect(getText(wrapper, TEST_ID.container)).toContain('Loading')
      await wrapper.update()
      await wrapper.update()
      expect(getElement(wrapper, TEST_ID.toggleCheck)).toBeChecked()

      // toggle completed back to false
      toggleCheck(wrapper, TEST_ID.toggleCheck)
      expect(getText(wrapper, TEST_ID.container)).toContain('Loading')
      await wrapper.update()
      expect(getElement(wrapper, TEST_ID.toggleCheck)).not.toBeChecked()
    })

    it('can delete Item', async () => {
      expect.assertions(2)
      click(wrapper, TEST_ID.deleteButton)
      expect(getText(wrapper, TEST_ID.container)).toContain('Loading')
      await wrapper.update()
      expect(getText(wrapper, TEST_ID.container)).toContain(TEXT.noItems)
    })
  })
})

import React from 'react'
import { mount } from 'enzyme'
import { getText, setValue, submitForm, expectTexts } from '../../testHelpers.e'
import AddTodo, { TEST_ID } from './AddTodo'

const TASK_REQUIRED_ERROR = 'Task required'
const TASK = 'task1'
const CATEGORY = 'category1'

const FORM_TEXTS = ['Add Todo', 'Task', 'Category', 'Submit']
const expectOnEmptyForm = (wrapper: any) => {
  expectTexts(wrapper, FORM_TEXTS)
  expect(wrapper.debug()).not.toContain(TASK)
  expect(wrapper.debug()).not.toContain(CATEGORY)
}

const expectOnFormWithError = (wrapper: any, error: string) => {
  expectTexts(wrapper, [...FORM_TEXTS, error])
}

const expectOnFilledInForm = (wrapper: any, inputs: string[]) => {
  expectTexts(wrapper, FORM_TEXTS)
  inputs.forEach(input => {
    expect(wrapper.debug()).toContain(input)
  })
}

const setup = () => mount(<AddTodo />)
describe('Add Todo Form', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = setup()
  })

  it('renders Form', () => {
    expect.assertions(6)
    expectOnEmptyForm(wrapper)
  })

  it('can submit Form succesfully', done => {
    expect.assertions(4 + 2 + 6)

    setValue(wrapper, 'task', TASK)
    setValue(wrapper, 'category', CATEGORY)
    expectOnFilledInForm(wrapper, [TASK, CATEGORY])

    submitForm(wrapper)
    setImmediate(() => {
      wrapper.update()
      expectOnEmptyForm(wrapper)
      done()
    })
  })

  it('shows error for Missing task', done => {
    expect.assertions(4 + 1 + 4 + 1)

    setValue(wrapper, 'category', CATEGORY)
    expectOnFilledInForm(wrapper, [CATEGORY])

    submitForm(wrapper)
    setImmediate(() => {
      wrapper.update()
      expectOnFormWithError(wrapper, TASK_REQUIRED_ERROR)
      done()
    })
  })

  it('removes error after new input', done => {
    expect.assertions(4 + 1 + 5 + 4 + 2 + 1)

    setValue(wrapper, 'category', CATEGORY)
    expectOnFilledInForm(wrapper, [CATEGORY])

    submitForm(wrapper)
    setImmediate(() => {
      wrapper.update()
      expectOnFormWithError(wrapper, TASK_REQUIRED_ERROR)

      setValue(wrapper, 'task', TASK)
      expectOnFilledInForm(wrapper, [TASK, CATEGORY])
      expect(getText(wrapper, TEST_ID.container)).not.toContain(
        TASK_REQUIRED_ERROR
      )
      done()
    })
  })
})

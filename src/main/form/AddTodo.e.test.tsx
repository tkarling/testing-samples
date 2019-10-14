import React from 'react'
import {
  mount,
  setValue,
  submitForm,
  expectTexts,
  callSetImmediate
} from '../../testHelpers.e'
import AddTodo, { TEST_ID } from './AddTodo'

const TASK_REQUIRED_ERROR = 'Task required'
const TASK_LABEL = 'Task:'
const TASK_VALUE = 'task1'
const CATEGORY_LABEL = 'Category:'
const CATEGORY_VALUE = 'category1'
const FORM_TEXTS = ['Add Todo', 'Submit', TASK_LABEL, CATEGORY_LABEL]

const expectNoText = (wrapper: any, text: string) => {
  expect(wrapper.text()).not.toContain(text)
}
const expectInput = (wrapper: any, label: string, value: string) => {
  expect(wrapper.debug()).toContain(value) // TODO: make more detailled
}
const submitAndWait = async (wrapper: any) => {
  submitForm(wrapper)
  await callSetImmediate()
  wrapper.update()
}

const expectOnEmptyForm = (wrapper: any) => {
  expectTexts(wrapper, FORM_TEXTS)
  expectInput(wrapper, CATEGORY_LABEL, '')
  expectInput(wrapper, TASK_LABEL, '')
}

const expectOnFormWithError = (wrapper: any, error: string) => {
  expectTexts(wrapper, [...FORM_TEXTS, error])
}

const expectOnFilledInForm = (
  wrapper: any,
  { taskValue = '', categoryValue = '' } = {
    taskValue: TASK_VALUE,
    categoryValue: CATEGORY_VALUE
  }
) => {
  expectTexts(wrapper, FORM_TEXTS)
  expectInput(wrapper, TASK_LABEL, taskValue)
  expectInput(wrapper, CATEGORY_LABEL, categoryValue)
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

  it('can submit Form succesfully', async () => {
    expect.assertions(6 + 6)

    setValue(wrapper, 'task', TASK_VALUE)
    setValue(wrapper, 'category', CATEGORY_VALUE)
    expectOnFilledInForm(wrapper)

    await submitAndWait(wrapper)
    expectOnEmptyForm(wrapper)
  })

  it('shows error for Missing task', async () => {
    expect.assertions(6 + 5)

    setValue(wrapper, 'category', CATEGORY_VALUE)
    expectOnFilledInForm(wrapper, { categoryValue: CATEGORY_VALUE })

    await submitAndWait(wrapper)
    expectOnFormWithError(wrapper, TASK_REQUIRED_ERROR)
  })

  it('removes error after new input', async () => {
    expect.assertions(6 + 5 + 6 + 1)

    setValue(wrapper, 'category', CATEGORY_VALUE)
    expectOnFilledInForm(wrapper, { categoryValue: CATEGORY_VALUE })

    await submitAndWait(wrapper)
    expectOnFormWithError(wrapper, TASK_REQUIRED_ERROR)

    setValue(wrapper, 'task', TASK_VALUE)
    expectOnFilledInForm(wrapper)
    expectNoText(wrapper, TASK_REQUIRED_ERROR)
  })
})

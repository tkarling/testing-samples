import React from 'react'
import { mount } from 'enzyme'
import { getText, setValue, submitForm } from '../../testHelpers.e'
import AddTodo, { TEST_ID } from './AddTodo'

const TASK_REQUIRED_ERROR = 'Task required'
const TASK = 'task1'
const CATEGORY = 'category1'

const expectTexts = (wrapper: any, texts: string[]) => {
  texts.forEach(text =>
    expect(getText(wrapper, TEST_ID.container)).toContain(text)
  )
}

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
const submit = async (wrapper: any) => {
  submitForm(wrapper)
  await wrapper.update()
  await wrapper.update()
}

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
    expect.assertions(4 + 2 + 6)

    setValue(wrapper, 'task', TASK)
    setValue(wrapper, 'category', CATEGORY)
    expectOnFilledInForm(wrapper, [TASK, CATEGORY])

    await submit(wrapper)
    expectOnEmptyForm(wrapper)
  })

  it('shows error for Missing task', async () => {
    expect.assertions(4 + 1 + 4 + 1)

    setValue(wrapper, 'category', CATEGORY)
    expectOnFilledInForm(wrapper, [CATEGORY])

    await submit(wrapper)
    expectOnFormWithError(wrapper, TASK_REQUIRED_ERROR)
  })

  it('removes error after new input', async () => {
    expect.assertions(4 + 1 + 5 + 4 + 2 + 1)

    setValue(wrapper, 'category', CATEGORY)
    expectOnFilledInForm(wrapper, [CATEGORY])

    await submit(wrapper)
    expectOnFormWithError(wrapper, TASK_REQUIRED_ERROR)

    setValue(wrapper, 'task', TASK)
    expectOnFilledInForm(wrapper, [TASK, CATEGORY])
    expect(getText(wrapper, TEST_ID.container)).not.toContain(
      TASK_REQUIRED_ERROR
    )
  })
})

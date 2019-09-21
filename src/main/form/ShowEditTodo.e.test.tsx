import React from 'react'
import {
  mount,
  getText,
  setValue,
  submitForm,
  expectTexts,
  callSetImmediate
} from '../../testHelpers.e'
import ShowEditTodo, { TEST_ID, SAMPLE } from './ShowEditTodo'

const TASK_REQUIRED_ERROR = 'Task required'
const TEXT = {
  buttonText: 'E'
}

const FORM_TEXTS = [TEXT.buttonText]
const expectOnView = (wrapper: any, inputs: string[]) => {
  expect(wrapper.find('input').length).toEqual(1)
  expectTexts(wrapper, FORM_TEXTS)
  inputs.forEach(input => {
    expect(wrapper.debug()).toContain(input)
  })
}

const expectOnFilledInForm = (wrapper: any, inputs: string[]) => {
  expect(wrapper.find('input').length).toEqual(3)
  expectTexts(wrapper, FORM_TEXTS)
  inputs.forEach(input => {
    expect(wrapper.debug()).toContain(input)
  })
}

const expectOnFormWithError = (wrapper: any, error: string) => {
  expect(wrapper.find('input').length).toEqual(3)
  expectTexts(wrapper, [...FORM_TEXTS, error])
}

const setup = () => mount(<ShowEditTodo />)
const clickEdit = (wrapper: any) => {
  submitForm(wrapper)
}

describe('Show/Edit Form', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = setup()
  })

  it('renders View', () => {
    expect.assertions(4)
    expectOnView(wrapper, [SAMPLE.task, SAMPLE.category])
  })

  it('goes to Form and renders it', () => {
    expect.assertions(4 + 4)
    expectOnView(wrapper, [SAMPLE.task, SAMPLE.category])

    clickEdit(wrapper)
    expectOnFilledInForm(wrapper, [SAMPLE.task, SAMPLE.category])
  })

  it('can submit Form succesfully', async () => {
    expect.assertions(4 + 4 + 4)

    clickEdit(wrapper)
    expectOnFilledInForm(wrapper, [SAMPLE.task, SAMPLE.category])

    const UPDATED = {
      task: SAMPLE.task + 1,
      category: SAMPLE.category + 'b'
    }
    setValue(wrapper, 'task', UPDATED.task)
    setValue(wrapper, 'category', UPDATED.category)
    expectOnFilledInForm(wrapper, [UPDATED.task, UPDATED.category])

    clickEdit(wrapper)
    await callSetImmediate()
    wrapper.update()
    expectOnView(wrapper, [UPDATED.task, UPDATED.category])
  })

  it('shows error for Missing task', async () => {
    expect.assertions(4 + 3 + 3)

    clickEdit(wrapper)
    expectOnFilledInForm(wrapper, [SAMPLE.task, SAMPLE.category])

    setValue(wrapper, 'task', '')
    expectOnFilledInForm(wrapper, [SAMPLE.category])

    clickEdit(wrapper)
    await callSetImmediate()
    wrapper.update()
    expectOnFormWithError(wrapper, TASK_REQUIRED_ERROR)
  })
})

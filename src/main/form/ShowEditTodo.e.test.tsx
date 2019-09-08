import React from 'react'
import { mount } from 'enzyme'
import { getText, setValue, submitForm } from '../../testHelpers.e'
import ShowEditTodo, { TEST_ID, SAMPLE } from './ShowEditTodo'

const TASK_REQUIRED_ERROR = 'Task required'
const TEXT = {
  buttonText: 'E'
}
const expectTexts = (wrapper: any, texts: string[]) => {
  texts.forEach(text =>
    expect(getText(wrapper, TEST_ID.container)).toContain(text)
  )
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

  it('can submit Form succesfully', done => {
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
    setImmediate(() => {
      wrapper.update()
      expectOnView(wrapper, [UPDATED.task, UPDATED.category])
      done()
    })
  })

  it('shows error for Missing task', done => {
    expect.assertions(4 + 3 + 3)

    clickEdit(wrapper)
    expectOnFilledInForm(wrapper, [SAMPLE.task, SAMPLE.category])

    setValue(wrapper, 'task', '')
    expectOnFilledInForm(wrapper, [SAMPLE.category])

    clickEdit(wrapper)
    setImmediate(() => {
      wrapper.update()
      expectOnFormWithError(wrapper, TASK_REQUIRED_ERROR)
      done()
    })
  })
})
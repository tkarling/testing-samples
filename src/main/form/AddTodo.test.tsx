import React from 'react'
import { render, fireEvent, getNodeText, wait } from '@testing-library/react'
import AddTodo from './AddTodo'

const TASK_REQUIRED_ERROR = 'Task required'
const TASK_LABEL = 'Task:'
const TASK_VALUE = 'task1'
const CATEGORY_LABEL = 'Category:'
const CATEGORY_VALUE = 'category1'

const FORM_TEXTS = ['Add Todo', 'Submit']
const expectTexts = (getter: any, texts: string[]) => {
  texts.forEach(text => {
    expect(getNodeText(getter(text))).toContain(text)
  })
}
const expectNoText = ({ queryByText }: any, text: string) => {
  expect(queryByText(text)).toBeNull()
}
const expectInput = (getter: any, label: string, value: string) => {
  expect(getter(label).value).toEqual(value)
}
const setValue = ({ getByLabelText }: any, label: string, value: string) => {
  const input = getByLabelText(label)
  fireEvent.change(input, { target: { value } })
}
const submitAndWait = async (
  { getByText }: any,
  getter: any,
  value: string
) => {
  fireEvent.click(getByText('Submit'))
  await wait(() => getter(value))
}

const expectOnEmptyForm = ({ getByText, getByLabelText }: any) => {
  expectTexts(getByText, FORM_TEXTS)
  expectInput(getByLabelText, TASK_LABEL, '')
  expectInput(getByLabelText, CATEGORY_LABEL, '')
}

const expectOnFormWithError = ({ getByText }: any, error: string) => {
  expectTexts(getByText, [...FORM_TEXTS, error])
}

const expectOnFilledInForm = (
  { getByText, getByLabelText }: any,
  { taskValue = '', categoryValue = '' } = {
    taskValue: TASK_VALUE,
    categoryValue: CATEGORY_VALUE
  }
) => {
  expectTexts(getByText, FORM_TEXTS)
  expectInput(getByLabelText, TASK_LABEL, taskValue)
  expectInput(getByLabelText, CATEGORY_LABEL, categoryValue)
}

const setup = () => render(<AddTodo />)
describe('Add Todo Form', () => {
  let wrapper: any
  beforeEach(() => {
    wrapper = setup()
  })

  it('renders Form', () => {
    expect.assertions(4)
    expectOnEmptyForm(wrapper)
  })

  it('can submit Form succesfully', async () => {
    expect.assertions(4 + 4)

    setValue(wrapper, TASK_LABEL, TASK_VALUE)
    setValue(wrapper, CATEGORY_LABEL, CATEGORY_VALUE)
    expectOnFilledInForm(wrapper)

    const { getAllByDisplayValue } = wrapper
    await submitAndWait(wrapper, getAllByDisplayValue, '')
    expectOnEmptyForm(wrapper)
  })

  it('shows error for Missing task', async () => {
    expect.assertions(4 + 3)

    setValue(wrapper, CATEGORY_LABEL, CATEGORY_VALUE)
    expectOnFilledInForm(wrapper, { categoryValue: CATEGORY_VALUE })

    const { getByText } = wrapper
    await submitAndWait(wrapper, getByText, TASK_REQUIRED_ERROR)

    expectOnFormWithError(wrapper, TASK_REQUIRED_ERROR)
  })

  it('removes error after new input', async () => {
    expect.assertions(4 + 3 + 4 + 1)

    setValue(wrapper, CATEGORY_LABEL, CATEGORY_VALUE)
    expectOnFilledInForm(wrapper, { categoryValue: CATEGORY_VALUE })

    const { getByText, queryByText } = wrapper
    await submitAndWait(wrapper, getByText, TASK_REQUIRED_ERROR)
    expectOnFormWithError(wrapper, TASK_REQUIRED_ERROR)

    setValue(wrapper, TASK_LABEL, TASK_VALUE)
    expectOnFilledInForm(wrapper)
    expectNoText(wrapper, TASK_REQUIRED_ERROR)
  })
})

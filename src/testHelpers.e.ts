export const getElement = (wrapper: any, id: string) =>
  wrapper.find(`[data-testid="${id}"]`)

export const getText = (wrapper: any, id: string) =>
  getElement(wrapper, id).text()
export const click = (wrapper: any, id: string) =>
  getElement(wrapper, id).simulate('click')
export const toggleCheck = (wrapper: any, id: string) =>
  getElement(wrapper, id).prop('onChange')()
// must use form/submit instead of clicking submit button
//see https://github.com/airbnb/enzyme/issues/1722
export const submitForm = (wrapper: any) =>
  wrapper.find('form').simulate('submit')

export const expectItem = (
  { id, title, completed }: Todo,
  {
    id: expectedId,
    title: expectedTitle,
    completed: expectedCompleted
  }: Partial<Todo>
) => {
  if (expectedId) {
    expect(id).toEqual(expectedId)
  }
  expect(title).toContain(expectedTitle)
  if (expectedCompleted != undefined) {
    expect(completed).toEqual(expectedCompleted)
  }
}

export const getElement = (wrapper: any, id: string) =>
  wrapper.find(`[data-testid="${id}"]`)

export const getText = (wrapper: any, id: string) =>
  getElement(wrapper, id).text()
export const click = (wrapper: any, id: string) =>
  getElement(wrapper, id).simulate('click')
export const toggleCheck = (wrapper: any, id: string) =>
  getElement(wrapper, id).prop('onChange')()

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

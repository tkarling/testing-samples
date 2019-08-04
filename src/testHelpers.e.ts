export const getElement = (wrapper: any, id: string) =>
  wrapper.find(`[data-testid="${id}"]`)

export const getText = (wrapper: any, id: string) =>
  getElement(wrapper, id).text()
export const click = (wrapper: any, id: string) =>
  getElement(wrapper, id).simulate('click')

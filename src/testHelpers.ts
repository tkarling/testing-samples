const getElement = (wrapper: any, id: string) =>
  wrapper.find(`[data-test-id="${id}"]`)

export const get = (wrapper: any, id: string) => getElement(wrapper, id).text()
export const click = (wrapper: any, id: string) =>
  getElement(wrapper, id).simulate('click')

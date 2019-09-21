export function callSetImmediate() {
  return new Promise(resolve => setImmediate(resolve))
  // alternative implementation
  // return new Promise(resolve => process.nextTick(resolve))
}

export const getElement = (wrapper: any, id: string) =>
  wrapper.find(`[data-testid="${id}"]`)

export const getText = (wrapper: any, id: string) =>
  getElement(wrapper, id).text()
export const click = (wrapper: any, id: string) =>
  getElement(wrapper, id).simulate('click')

// from https://github.com/airbnb/enzyme/issues/218
export const setValue = (wrapper: any, id: string, value: string) => {
  const input = getElement(wrapper, id)
  input.getDOMNode().value = value
  input.simulate('change')
}
export const toggleCheck = (wrapper: any, id: string) =>
  getElement(wrapper, id).prop('onChange')()

// must use form/submit instead of clicking submit button
//see https://github.com/airbnb/enzyme/issues/1722
export const submitForm = (wrapper: any) =>
  wrapper.find('form').simulate('submit')

export const expectTexts = (wrapper: any, texts: string[]) =>
  texts.forEach(text => expect(wrapper.text()).toContain(text))

export * from 'enzyme'

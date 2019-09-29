export const mockExpectedCounter = 6
const mock = {
  getCounter: jest.fn(storeId => Promise.resolve(mockExpectedCounter)),
  setCounter: jest.fn((storeId, counter) => Promise.resolve(counter))
}

export default mock

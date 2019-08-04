import * as api from './service'

const mockExpectedValue = 6
jest.mock('../api/service', () => {
  return { getValue: jest.fn(() => Promise.resolve(mockExpectedValue)) }
})

describe('api', () => {
  it('gets value from api', async () => {
    const data = await api.getValue()
    expect(data).toEqual(mockExpectedValue)
  })
})

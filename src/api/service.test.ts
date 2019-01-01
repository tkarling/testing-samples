import { expectItem } from '../testHelpers.e'
import { api1 as api, api2, FETCHED_COUNTER, FETCHED_TODOS } from './service'

jest.useFakeTimers()

describe('api', () => {
  const callApi = async (fn: Function, payload: any = undefined) => {
    const dataPromise = fn(payload)
    jest.runAllTimers()
    return await dataPromise
  }
  const api2DidNotChange = async () => {
    const data2 = await callApi(api2.getTodos)
    expect(data2.length).toEqual(FETCHED_TODOS.length)
    expectItem(data2[0], { ...FETCHED_TODOS[0], id: undefined })
  }

  beforeEach(() => {
    api.resetTodos()
  })
  it('gets counter', async () => {
    const data = await callApi(api.getCounter)
    expect(data).toEqual(FETCHED_COUNTER)

    // api2 did not change
    const data2 = await callApi(api.getCounter)
    expect(data).toEqual(FETCHED_COUNTER)
  })

  it('gets todos', async () => {
    const data = await callApi(api.getTodos)
    expect(data).toEqual(FETCHED_TODOS)

    await api2DidNotChange()
  })
  it('adds todo', async () => {
    const todoToAdd: Partial<Todo> = { title: 'added todo' }
    const data = await callApi(api.addTodo, todoToAdd)
    expect(data.length).toEqual(FETCHED_TODOS.length + 1)
    expectItem(data[0], todoToAdd)

    await api2DidNotChange()
  })

  it('deletes todo', async () => {
    const todoToDelete = FETCHED_TODOS[0]
    const data = await callApi(api.deleteTodo, todoToDelete)
    expect(data.length).toEqual(FETCHED_TODOS.length - 1)
    expect(
      data.find((todo: Todo) => todo.id === todoToDelete.id)
    ).not.toBeDefined()

    await api2DidNotChange()
  })

  it('toggles todo', async () => {
    const todoToToggle = FETCHED_TODOS[0]
    const data = await callApi(api.toggleTodo, todoToToggle)
    expect(data.length).toEqual(FETCHED_TODOS.length)
    expectItem(data[0], { ...todoToToggle, completed: !todoToToggle.completed })

    await api2DidNotChange()
  })
})

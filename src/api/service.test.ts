import * as api from './service'

jest.useFakeTimers()

describe('api', () => {
  const callApi = async (fn: Function, payload: any = undefined) => {
    const dataPromise = fn(payload)
    jest.runAllTimers()
    return await dataPromise
  }
  const expectItem = (
    { title, completed }: Todo,
    { title: expectedTitle, completed: expectedComplete }: Partial<Todo>
  ) =>
    title === expectedTitle &&
    (completed !== undefined ? completed === expectedComplete : true)

  beforeEach(() => {
    api.resetTodos()
  })
  it('gets value', async () => {
    const data = await callApi(api.getValue)
    expect(data).toEqual(api.FETCHED_VALUE)
  })

  it('gets todos', async () => {
    const data = await callApi(api.getTodos)
    expect(data).toEqual(api.FETCHED_TODOS)
  })
  it('adds todo', async () => {
    const todoToAdd: Partial<Todo> = { title: 'added todo' }
    const data = await callApi(api.addTodo, todoToAdd)
    expect(data.length).toEqual(api.FETCHED_TODOS.length + 1)
    expectItem(data[0], todoToAdd)
  })

  it('deletes todo', async () => {
    const todoToDelete = api.FETCHED_TODOS[0]
    const data = await callApi(api.deleteTodo, todoToDelete)
    expect(data.length).toEqual(api.FETCHED_TODOS.length - 1)
    expect(
      data.find((todo: Todo) => todo.id === todoToDelete.id)
    ).not.toBeDefined()
  })

  it('toggles todo', async () => {
    const todoToToggle = api.FETCHED_TODOS[0]
    const data = await callApi(api.toggleTodo, todoToToggle)
    expect(data.length).toEqual(api.FETCHED_TODOS.length)
    expectItem(data[0], { ...todoToToggle, completed: !todoToToggle.completed })
  })
})

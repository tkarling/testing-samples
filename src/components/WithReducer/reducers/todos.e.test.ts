import todosReducer, { ACTION } from './todos'

const TODO = { id: '1', title: 'moi', completed: false }
const TODO2 = { id: '2', title: 'hei', completed: false }
const INITIAL_TODOS = [TODO, TODO2]

describe('todos Reducer', () => {
  const expectItem = (
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
    expect(completed).toEqual(expectedCompleted)
  }

  it('sets todos', async () => {
    const todos = todosReducer([], {
      type: ACTION.set,
      todos: INITIAL_TODOS
    })
    expect(todos.length).toBe(2)
    expectItem(todos[0] as Todo, TODO)
    expectItem(todos[1] as Todo, TODO2)
  })

  it('adds todo', async () => {
    const TITLE = 'joo'
    const todos = todosReducer(INITIAL_TODOS, {
      type: ACTION.add,
      title: TITLE
    })
    expect(todos.length).toBe(INITIAL_TODOS.length + 1)
    expectItem(todos[0] as Todo, { title: TITLE, completed: false })
    expectItem(todos[1] as Todo, TODO)
    expectItem(todos[2] as Todo, TODO2)
  })

  it('deletes todo', async () => {
    const todos = todosReducer(INITIAL_TODOS, {
      type: ACTION.delete,
      todo: INITIAL_TODOS[0]
    })
    expect(todos.length).toBe(INITIAL_TODOS.length - 1)
    expectItem(todos[0] as Todo, TODO2)
  })

  it('toggles todo', async () => {
    const todos = todosReducer(INITIAL_TODOS, {
      type: ACTION.toggle,
      todo: INITIAL_TODOS[0]
    })
    expect(todos.length).toBe(INITIAL_TODOS.length)
    expectItem(todos[0] as Todo, { ...TODO, completed: !TODO.completed })
    expectItem(todos[1] as Todo, TODO2)
  })
})

async function stall(stallTime = 3000) {
  await new Promise(resolve => setTimeout(resolve, stallTime))
}
const getId = () => Date.now() + ''

export const FETCHED_VALUE = 5
export const getValue = () => stall().then(() => FETCHED_VALUE)

export const FETCHED_TODOS: Todo[] = [
  {
    id: '1',
    title: 'moi',
    completed: false
  },
  {
    id: '2',
    title: 'hei',
    completed: false
  }
]

let todos = FETCHED_TODOS

// needed for unit testing
export const resetTodos = () => {
  todos = FETCHED_TODOS
}

export const getTodos = () => stall().then(() => todos)

export const addTodo = ({
  title = 'unknown',
  completed = false
}: Partial<Todo>) =>
  stall().then(() => {
    const id = getId()
    todos = [{ id, title: title + id.substring(9, 13), completed }, ...todos]
    return todos
  })

export const deleteTodo = (todoToDelete: Todo) =>
  stall().then(() => {
    todos = todos.filter(todo => todo.id !== todoToDelete.id)
    return todos
  })

export const toggleTodo = (todoToToggle: Todo) =>
  stall().then(() => {
    todos = todos.map(todo =>
      todo.id !== todoToToggle.id
        ? todo
        : { ...todo, completed: !todo.completed }
    )
    return todos
  })

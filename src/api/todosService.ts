async function stall(stallTime = 1000) {
  await new Promise(resolve => setTimeout(resolve, stallTime))
}
const getId = () => Date.now() + ''

const APP_ID = 'TEST_SAMPLES'
export const DEFAULT_TODOS: Todo[] = [
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
export default class todosService {
  static TODOS_ID = 'todosId'
  static getId(storeId: string) {
    return APP_ID + ', ' + storeId + ': ' + todosService.TODOS_ID
  }

  static getTodos = (storeId: string) =>
    stall().then(() => {
      const asString = localStorage.getItem(todosService.getId(storeId))
      return asString ? JSON.parse(asString) : DEFAULT_TODOS
    })

  static addTodo = (
    storeId: string,
    { title = 'unknown', completed = false }: Partial<Todo>
  ) =>
    stall().then(async () => {
      const id = getId()
      const todos = await todosService.getTodos(storeId)
      const updatedTodos = [
        { id, title: title + id.substring(9, 13), completed },
        ...todos
      ]
      localStorage.setItem(
        todosService.getId(storeId),
        JSON.stringify(updatedTodos)
      )
      return updatedTodos
    })

  static deleteTodo = (storeId: string, todoToDelete: Todo) =>
    stall().then(async () => {
      const todos = await todosService.getTodos(storeId)
      const updatedTodos = todos.filter(
        (todo: Todo) => todo.id !== todoToDelete.id
      )
      localStorage.setItem(
        todosService.getId(storeId),
        JSON.stringify(updatedTodos)
      )
      return updatedTodos
    })

  static toggleTodo = (storeId: string, todoToToggle: Todo) =>
    stall().then(async () => {
      const todos = await todosService.getTodos(storeId)
      const updatedTodos = todos.map((todo: Todo) =>
        todo.id !== todoToToggle.id
          ? todo
          : { ...todo, completed: !todo.completed }
      )
      localStorage.setItem(
        todosService.getId(storeId),
        JSON.stringify(updatedTodos)
      )
      return updatedTodos
    })
}

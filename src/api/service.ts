async function stall(stallTime = 1000) {
  await new Promise(resolve => setTimeout(resolve, stallTime))
}
const getId = () => Date.now() + ''

export const FETCHED_COUNTER = 5
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
export class serviceApi {
  counter = FETCHED_COUNTER
  // needed for unit testing
  resetCounter = () => {
    this.counter = FETCHED_COUNTER
  }

  getCounter = () => stall().then(() => this.counter)
  setCounter = (counter: number) =>
    stall().then(() => {
      this.counter = counter
      console.log('setting', this.counter)
      return this.counter
    })

  todos = FETCHED_TODOS
  // needed for unit testing
  resetTodos = () => {
    this.todos = FETCHED_TODOS
  }

  getTodos = () => stall().then(() => this.todos)

  addTodo = ({ title = 'unknown', completed = false }: Partial<Todo>) =>
    stall().then(() => {
      const id = getId()
      this.todos = [
        { id, title: title + id.substring(9, 13), completed },
        ...this.todos
      ]
      return this.todos
    })

  deleteTodo = (todoToDelete: Todo) =>
    stall().then(() => {
      this.todos = this.todos.filter(todo => todo.id !== todoToDelete.id)
      return this.todos
    })

  toggleTodo = (todoToToggle: Todo) =>
    stall().then(() => {
      this.todos = this.todos.map(todo =>
        todo.id !== todoToToggle.id
          ? todo
          : { ...todo, completed: !todo.completed }
      )
      return this.todos
    })
}

export const api2 = new serviceApi()
export const api1 = new serviceApi()

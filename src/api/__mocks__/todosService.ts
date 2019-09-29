const TODO = {
  id: '1',
  title: 'moi',
  completed: false
}
const ADDED_TODO = {
  id: '3',
  title: 'joo',
  completed: false
}

export const mockTodosInitial = [TODO]
export const mockTodosAfterAdd = [ADDED_TODO, TODO]
export const mockTodosAfterToTrue = [{ ...TODO, completed: true }]
export const mockTodosAfterToFalse = [{ ...TODO, completed: false }]
const mock = {
  getTodos: jest.fn(() => Promise.resolve(mockTodosInitial)),
  addTodo: jest.fn(() => Promise.resolve(mockTodosAfterAdd)),
  toggleTodo: jest.fn(() => Promise.resolve(mockTodosAfterToTrue)),
  deleteTodo: jest.fn(() => Promise.resolve([]))
}

export default mock

import React, { useReducer } from 'react'
import todosReducer, { ACTIONS } from '../reducers/todosReducer'

export const TEXT = {
  noItems: 'No Items',
  itemTitleBase: 'moi'
}

export const TEST_ID = {
  container: 'withReducer',
  addButton: 'addButton',
  deleteButton: 'deleteButton',
  toggleCheck: 'toggleCheck'
}

const EmptyList = () => <div>{TEXT.noItems}</div>

const AddButton = ({ dispatch }: { dispatch: any }) => (
  <div>
    <button
      data-testid={TEST_ID.addButton}
      onClick={() => dispatch({ type: ACTIONS.add, title: TEXT.itemTitleBase })}
    >
      Add
    </button>
  </div>
)

const CheckBox = ({ todo, dispatch }: { todo: Todo; dispatch: any }) => (
  <input
    data-testid={TEST_ID.toggleCheck}
    type="checkbox"
    checked={todo.completed}
    onChange={() => dispatch({ type: ACTIONS.toggle, todo })}
  />
)

const DeleteButton = ({ todo, dispatch }: { todo: Todo; dispatch: any }) => (
  <button
    data-testid={TEST_ID.deleteButton}
    onClick={() => dispatch({ type: ACTIONS.delete, todo })}
  >
    x
  </button>
)

const TodoList = ({ todos, dispatch }: { todos: Todo[]; dispatch: any }) => (
  <div>
    <AddButton dispatch={dispatch} />
    {todos.map((todo: Todo) => (
      <div key={todo.id}>
        <CheckBox todo={todo} dispatch={dispatch} />
        {todo.title}
        <DeleteButton todo={todo} dispatch={dispatch} />
      </div>
    ))}
  </div>
)

const WithReducer = () => {
  const [todos, dispatch] = useReducer(todosReducer, [])

  return (
    <div data-testid={TEST_ID.container} style={{ border: '1px solid blue' }}>
      {!todos.length && <EmptyList />}
      <TodoList todos={todos} dispatch={dispatch} />
    </div>
  )
}

export default WithReducer

import React, { useReducer } from 'react'
import todosReducer, { ACTIONS } from '../reducers/todosReducer'

const EmptyList = () => <div>No Items</div>

const AddButton = ({ dispatch }: { dispatch: any }) => (
  <div>
    <button onClick={() => dispatch({ type: ACTIONS.add, title: 'moi' })}>
      Add
    </button>
  </div>
)

const CheckBox = ({ todo, dispatch }: { todo: Todo; dispatch: any }) => (
  <input
    type="checkbox"
    onChange={() => dispatch({ type: ACTIONS.toggle, todo })}
  />
)

const DeleteButton = ({ todo, dispatch }: { todo: Todo; dispatch: any }) => (
  <button onClick={() => dispatch({ type: ACTIONS.delete, todo })}>x</button>
)

const TodoList = ({ todos, dispatch }: { todos: Todo[]; dispatch: any }) => (
  <div>
    <AddButton dispatch={dispatch} />
    {todos.map((todo: Todo) => (
      <div>
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
    <div style={{ border: '1px solid blue' }}>
      {!todos.length && <EmptyList />}
      <TodoList todos={todos} dispatch={dispatch} />
    </div>
  )
}

export default WithReducer

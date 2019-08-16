import React, { useContext } from 'react'
import useAsyncTodos, { ACTION } from './hooks/useAsyncTodos'
import * as Widget from './Common'
import { TEST_ID } from './Common'

const TodoList = () => {
  const { todos } = useContext(TodosContext)
  const { dispatch } = useContext(ActionContext)

  return (
    <Widget.TodoList>
      <Widget.Row>
        <Widget.AddButton dispatch={dispatch} type={ACTION.startAdd} />
      </Widget.Row>
      {!todos.length && <Widget.EmptyList />}
      {todos.map((todo: Todo) => (
        <Widget.Row key={todo.id}>
          <Widget.Todo>
            <Widget.CheckBox
              todo={todo}
              dispatch={dispatch}
              type={ACTION.startToggle}
            />
            <Widget.Title>{todo.title}</Widget.Title>
            <Widget.DeleteButton
              todo={todo}
              dispatch={dispatch}
              type={ACTION.startDelete}
            />
          </Widget.Todo>
        </Widget.Row>
      ))}
    </Widget.TodoList>
  )
}

const asyncNoop = (action: any) => Promise.resolve()
const TodosContext = React.createContext({ todos: [], isLoading: false })
const ActionContext = React.createContext({ dispatch: asyncNoop })

const WithContextAsyncReducer = () => {
  const { todos, isLoading, dispatch } = useAsyncTodos()

  return (
    <ActionContext.Provider value={{ dispatch }}>
      <TodosContext.Provider value={{ todos, isLoading }}>
        <div data-testid={TEST_ID.container}>
          <h4>With Context Async Reducer</h4>
          {isLoading && <div>Loading...</div>}
          {!isLoading && <TodoList />}
        </div>
      </TodosContext.Provider>
    </ActionContext.Provider>
  )
}

export default WithContextAsyncReducer

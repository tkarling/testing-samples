import React, { useContext } from 'react'
import { ACTION, useAsyncTodos2 as useAsyncTodos } from './hooks/useAsyncTodos'
import * as Widget from './components/Common'
import { TEST_ID } from './components/Common'

const TodoList = () => {
  const { todos } = useContext(TodosContext)
  const { dispatch } = useContext(ActionContext)

  return (
    <Widget.List>
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
    </Widget.List>
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
          {isLoading && <div>Spinning...</div>}
          {!isLoading && <TodoList />}
        </div>
      </TodosContext.Provider>
    </ActionContext.Provider>
  )
}

export default WithContextAsyncReducer

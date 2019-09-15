import React, { useContext } from 'react'
import { ACTION } from './hooks/useAsyncTodos'
import * as Widget from './components/Common'
import { TodosContext, ActionContext } from './WithContextAsyncReducerContext'

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

export default TodoList

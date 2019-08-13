import React from 'react'

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

export const EmptyList = () => <div>{TEXT.noItems}</div>

export const AddButton = ({
  dispatch,
  type
}: {
  dispatch: any
  type: string
}) => (
  <div>
    <button
      data-testid={TEST_ID.addButton}
      onClick={() => dispatch({ type, title: TEXT.itemTitleBase })}
    >
      Add
    </button>
  </div>
)

export const CheckBox = ({
  todo,
  dispatch,
  type
}: {
  todo: Todo
  dispatch: any
  type: string
}) => (
  <input
    data-testid={TEST_ID.toggleCheck}
    type="checkbox"
    checked={todo.completed}
    onChange={() => dispatch({ type, todo })}
  />
)

export const DeleteButton = ({
  todo,
  dispatch,
  type
}: {
  todo: Todo
  dispatch: any
  type: string
}) => (
  <button
    data-testid={TEST_ID.deleteButton}
    onClick={() => dispatch({ type, todo })}
  >
    x
  </button>
)

import React from 'react'
import styles from './Common.module.css'

export const TEXT = {
  spinning: 'Spinning',
  noItems: 'No Items',
  itemTitleBase: 'moi'
}

export const TEST_ID = {
  container: 'withReducer',
  addButton: 'addButton',
  deleteButton: 'deleteButton',
  toggleCheck: 'toggleCheck'
}

export const Row = ({ children }: { children: any }) => (
  <div className={styles.Row}>{children}</div>
)

export const List = ({ children }: { children: any }) => (
  <div className={styles.List}>{children}</div>
)

export const Todo = ({ children }: { children: any }) => (
  <div className={styles.Todo}>{children}</div>
)

export const Title = ({ children }: { children: any }) => (
  <div className={styles.Title}>{children}</div>
)
export const EmptyList = () => <Row>{TEXT.noItems}</Row>

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
    className={styles.DeleteButton}
    onClick={() => dispatch({ type, todo })}
  >
    x
  </button>
)

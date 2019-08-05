export const ACTIONS = {
  add: 'add',
  delete: 'delete',
  toggle: 'toggle'
}

const todosReducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.add: {
      const id = new Date().getTime() + ''
      return [
        { id, title: action.title + id.substring(9, 13), completed: false },
        ...state
      ]
    }
    case ACTIONS.delete:
      return state.filter((todo: Todo) => todo.id !== action.todo.id)
    case ACTIONS.toggle:
      return state.map((todo: Todo) =>
        todo.id !== action.todo.id
          ? todo
          : { ...todo, completed: !todo.completed }
      )

    default:
      console.log('unknown action ', action)
      return state
  }
}

export default todosReducer

export const ACTION = {
  set: 'set',
  add: 'add',
  delete: 'delete',
  toggle: 'toggle'
}

const todosReducer = (
  state: Todo[],
  {
    type,
    title,
    todo,
    todos
  }: { type: any; title?: string; todo?: Todo; todos?: Todo[] }
) => {
  switch (type) {
    case ACTION.set:
      // console.log('set called', action.todos)
      return todos || []
    case ACTION.add: {
      // console.log('add called', action.title)
      const id = new Date().getTime() + ''
      return [
        { id, title: title + id.substring(9, 13), completed: false },
        ...state
      ]
    }
    case ACTION.delete:
      // console.log('delete called', action.todo.id)
      return state.filter((todoC: Todo) =>
        todo ? todoC.id !== todo.id : todoC
      )
    case ACTION.toggle:
      // console.log('toggle called', action.todo.id)
      return state.map((todoC: Todo) =>
        todo && todoC.id === todo.id
          ? { ...todoC, completed: !todoC.completed }
          : todoC
      )

    default:
      console.log('unknown action ', type, title, todo, todos)
      return state
  }
}

export default todosReducer

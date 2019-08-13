export const ACTIONS = {
  set: 'set',
  add: 'add',
  delete: 'delete',
  toggle: 'toggle',
  startAdd: 'startAdd',
  startDelete: 'startDelete',
  startToggle: 'startToggle'
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
    case ACTIONS.set:
      // console.log('set called', action.todos)
      return todos || []
    case ACTIONS.add: {
      // console.log('add called', action.title)
      const id = new Date().getTime() + ''
      return [
        { id, title: title + id.substring(9, 13), completed: false },
        ...state
      ]
    }
    case ACTIONS.delete:
      // console.log('delete called', action.todo.id)
      return state.filter((todoC: Todo) =>
        todo ? todoC.id !== todo.id : todoC
      )
    case ACTIONS.toggle:
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

export interface Field {
  id: string
  label?: string
  placeholder?: string
  name?: string
  type?: string
  autoComplete?: string
}

export const FIELDS = {
  task: {
    id: 'task',
    label: 'Task',
    placeholder: 'Task Name'
  },
  category: {
    id: 'category',
    label: 'Category'
  }
}

import React from 'react'
import { FIELDS } from './data'
import {
  FormHorizontal,
  FormRow,
  FormColumn,
  FormField
} from '../../components/Form'
import { useToggleEditingForm as useForm } from '../../hooks/useForm'
export const TEST_ID = {
  container: 'container'
}
export const SAMPLE = { task: 'go shopping', category: 'weekly' }

const submit = (inputs: any) => {
  if (!inputs.task) {
    return Promise.reject(new Error('Task required'))
  }
  console.log('submitted', inputs)
  return Promise.resolve()
}

const ShowEditTodo = () => {
  const {
    inputs,
    serverError,
    editing,
    onChange,
    onToggle,
    onSubmit
  } = useForm({
    callback: submit,
    initialValues: {
      task: SAMPLE.task,
      category: SAMPLE.category,
      completed: false
    }
  })

  return (
    <div data-testid={TEST_ID.container}>
      <FormHorizontal
        onSubmit={onSubmit}
        serverError={serverError}
        editing={editing}
      >
        <FormRow>
          <FormField
            {...FIELDS.completed}
            value={inputs.completed}
            onChange={onToggle}
            showLabel={false}
            editing={true}
          />
          <FormColumn>
            <FormField
              {...FIELDS.task}
              value={inputs.task}
              onChange={onChange}
              showLabel={false}
              editing={editing}
            />
            <FormField
              {...FIELDS.category}
              value={inputs.category}
              onChange={onChange}
              showLabel={false}
              editing={editing}
            />
          </FormColumn>
        </FormRow>
      </FormHorizontal>
    </div>
  )
}

export default ShowEditTodo

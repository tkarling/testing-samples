import React from 'react'
import { FIELDS } from './data'
import { Form, FormField } from '../../components/Form'
import useForm from '../../hooks/useForm'
export const TEST_ID = {
  container: 'container'
}

const submit = (inputs: any) => {
  if (!inputs.task) {
    return Promise.reject(new Error('Task required'))
  }
  console.log('submitted', { ...inputs, completed: false })
  return Promise.resolve(true)
}

const AddTodo = () => {
  const { inputs, serverError, onChange, onSubmit } = useForm({
    callback: submit
  })

  return (
    <div data-testid={TEST_ID.container}>
      <Form onSubmit={onSubmit} title="Add Todo" serverError={serverError}>
        <FormField {...FIELDS.task} value={inputs.task} onChange={onChange} />
        <FormField
          {...FIELDS.category}
          value={inputs.category}
          onChange={onChange}
        />
      </Form>
    </div>
  )
}

export default AddTodo

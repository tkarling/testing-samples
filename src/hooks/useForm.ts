import { useState } from 'react'

const noop = (what = 'submit') => (inputs: any) => {
  console.log(what + ' called with:', inputs)
  return Promise.resolve({})
}

const useForm = (
  {
    initialValues = {},
    callback = noop('submit')
  }: {
    initialValues?: any
    callback?: Function
  } = {
    initialValues: {},
    callback: noop('submit')
  }
) => {
  const [inputs, setInputs] = useState(initialValues)
  const [serverError, setServerError] = useState('')

  const onSubmit = (event: any) => {
    if (event && event.preventDefault) {
      event.preventDefault()
    }
    return callback(inputs)
      .then((shouldSetToInitialValues: boolean = false) => {
        if (shouldSetToInitialValues === true) {
          setInputs(initialValues)
        }
      })
      .catch((error: Error) => {
        setServerError(error.message)
        throw error
      })
  }
  const onChange = (event: any) => {
    const { name = 'nameNotSet', value } = event.target ? event.target : event
    if (serverError) {
      setServerError('')
    }
    setInputs((inputs: any) => ({
      ...inputs,
      [name]: value
    }))
  }
  const onToggle = (event: any) => {
    const { name = 'nameNotSet' } = event.target ? event.target : event
    onChange({ name, value: !!!inputs[name] })
  }
  return {
    inputs,
    serverError,
    onSubmit,
    onToggle,
    onChange
  }
}

export const useToggleEditingForm = (
  {
    initialValues = {},
    callback = noop('submit')
  }: {
    initialValues?: any
    callback?: Function
  } = {
    initialValues: {},
    callback: noop('submit')
  }
) => {
  const [editing, setEditing] = useState(false)
  const { onSubmit, ...formProps } = useForm({ initialValues, callback })
  const submit = (event: any) => {
    if (!editing) {
      setEditing(editing => !editing)
      return
    }
    onSubmit(event)
      .then(() => setEditing(editing => !editing))
      .catch(() => {
        /** noop, error already shown */
      })
  }
  return {
    ...formProps,
    onSubmit: submit,
    editing
  }
}

export default useForm

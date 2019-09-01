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
    callback(inputs)
      .then(setInputs(initialValues))
      .catch((error: Error) => setServerError(error.message))
  }
  const onChange = (event: any) => {
    const { name = 'nameNotSet', value } = event.target ? event.target : event
    setInputs((inputs: any) => ({
      ...inputs,
      [name]: value
    }))
  }
  return {
    inputs,
    serverError,
    onSubmit,
    onChange
  }
}
export default useForm

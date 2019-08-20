import { useState } from 'react'

const noop = (what = 'submit') => (inputs: any) => {
  console.log(what + ' called with:', inputs)
  return {}
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

  const onSubmit = (event: any) => {
    if (event && event.preventDefault) {
      event.preventDefault()
    }
    if (callback(inputs)) {
      setInputs({})
    }
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
    onSubmit,
    onChange
  }
}
export default useForm

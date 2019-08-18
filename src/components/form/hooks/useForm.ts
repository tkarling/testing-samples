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
    callback(inputs)
  }
  const onChange = (event: any) => {
    const { name = '', value } = event.target ? event.target : event
    setInputs((inputs: any) => ({
      ...inputs,
      [name]: value
    }))
  }
  return {
    onSubmit,
    onChange,
    inputs
  }
}
export default useForm
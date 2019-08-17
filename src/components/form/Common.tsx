import React, { useCallback } from 'react'

import styles from './Login.module.css'

export const FormField = ({
  id,
  label,
  placeholder,
  name,
  type,
  autoComplete,
  onChange
}: {
  id: string
  label?: string
  placeholder?: string
  name?: string
  type?: string
  autoComplete?: string
  onChange: Function
}) => (
  <div className={styles.FormField}>
    <label>{label || id}:</label>
    <input
      className={styles.FormFieldInput}
      name={name || id}
      type={type}
      onChange={onChange as any}
      placeholder={placeholder || label || id}
      autoComplete={autoComplete}
    />
  </div>
)

export const Form = ({
  onSubmit,
  title,
  link,
  children
}: {
  onSubmit: any
  title: string
  link?: { label: string; onClick: any }
  children: any
}) => {
  const onSubmitP = useCallback(
    (event: any) => {
      event.preventDefault()
      onSubmit(event)
    },
    [onSubmit]
  )
  return (
    <form className={styles.Form} onSubmit={onSubmitP}>
      <div className={styles.FormTitleRow}>
        <div className={styles.FormTitle}>{title}</div>
        {link && (
          <a className={styles.FormLink} onClick={link.onClick}>
            {link.label}
          </a>
        )}
      </div>
      {children}
      <button className={styles.FormSubmit}>Submit</button>
    </form>
  )
}

// export const Login = ({
//   onChange,
//   onSubmit,
//   onGoto
// }: {
//   onChange?: any
//   onSubmit?: any
//   onGoto?: any
// }) => {
//   return (
//     <Form
//       onSubmit={onSubmit}
//       title="Sign In"
//       link={{ label: 'Need an account? Sign Up', onClick: onGoto }}
//     >
//       <FormField field={FIELDS.username} onChange={onChange} />
//       <FormField field={FIELDS.password} onChange={onChange} />
//     </Form>
//   )
// }

// export const Register = ({
//   onChange,
//   onSubmit,
//   onGoto
// }: {
//   onChange?: any
//   onSubmit?: any
//   onGoto?: any
// }) => {
//   return (
//     <Form
//       onSubmit={onSubmit}
//       title="Sign Up"
//       link={{ label: 'Return to Sign In', onClick: onGoto }}
//     >
//       <FormField field={FIELDS.username} onChange={onChange} />
//       <FormField field={FIELDS.password} onChange={onChange} />
//       <FormField field={FIELDS.repeatPassword} onChange={onChange} />
//     </Form>
//   )
// }

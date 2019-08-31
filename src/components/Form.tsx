import React, { useCallback } from 'react'

import styles from './Form.module.css'

export const TEST_ID = {
  link: 'link',
  submitButton: 'submitButton'
}
export const FormField = ({
  id,
  label,
  placeholder,
  name,
  type,
  value = '', // a value always needed to make input controlled
  autoComplete,
  onChange
}: {
  id: string
  label?: string
  placeholder?: string
  name?: string
  type?: string
  value?: string
  autoComplete?: string
  onChange: Function
}) => (
  <div className={styles.FormField}>
    <label>{label || id}:</label>
    <input
      data-testid={id}
      className={styles.FormFieldInput}
      name={name || id}
      type={type}
      value={value}
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
  children,
  serverError
}: {
  onSubmit: any
  title: string
  link?: { label: string; onClick: any }
  children: any
  serverError?: string
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
          <a
            data-testid={TEST_ID.link}
            className={styles.FormLink}
            onClick={link.onClick}
          >
            {link.label}
          </a>
        )}
      </div>
      {children}
      <div className={styles.FormError}>{serverError}</div>
      <button data-testid={TEST_ID.submitButton} className={styles.FormSubmit}>
        Submit
      </button>
    </form>
  )
}

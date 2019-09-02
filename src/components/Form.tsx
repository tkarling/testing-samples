import React, { useCallback } from 'react'

import styles from './Form.module.css'

export const TEST_ID = {
  link: 'link',
  submitButton: 'submitButton',
  editButton: 'editButton'
}
export const FormField = ({
  id,
  label,
  placeholder,
  name,
  type,
  value = '', // a value always needed to make input controlled
  autoComplete,
  onChange,
  showLabel = true,
  editing = true
}: {
  id: string
  label?: string
  placeholder?: string
  name?: string
  type?: string
  value?: string
  autoComplete?: string
  onChange: Function
  showLabel?: boolean
  editing?: boolean
}) => (
  <div className={styles.FormField}>
    {showLabel && <label>{label || id}:</label>}
    {editing && (
      <input
        data-testid={id}
        style={showLabel ? { minWidth: '60%' } : { minWidth: '100%' }}
        name={name || id}
        type={type}
        value={value}
        onChange={onChange as any}
        placeholder={placeholder || label || id}
        autoComplete={autoComplete}
      />
    )}
    {!editing && <div>{value}</div>}
  </div>
)

export const FormRow = ({ children }: { children: any }) => (
  <div className={styles.FormRow}>{children}</div>
)

export const FormColumn = ({ children }: { children: any }) => (
  <div className={styles.FormColumn}>{children}</div>
)

export const Form = ({
  onSubmit,
  title,
  link,
  children,
  serverError
}: {
  onSubmit: any
  title?: string
  link?: { label: string; onClick: any }
  children: any
  serverError?: string
}) => {
  const onSubmitP = useCallback(
    (event: any) => {
      event.preventDefault()
      onSubmit(event).catch(() => {
        /**noop, erro already shown */
      })
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

export const FormHorizontal = ({
  onSubmit,
  title,
  children,
  serverError,
  editing = false
}: {
  onSubmit: any
  title?: string
  children: any
  serverError?: string
  editing?: boolean
}) => {
  const onSubmitP = useCallback(
    (event: any) => {
      event.preventDefault()
      onSubmit(event)
    },
    [onSubmit]
  )
  return (
    <div>
      <form className={styles.Form} onSubmit={onSubmitP}>
        <div className={styles.FormTitleRow}>
          <div className={styles.FormTitle}>{title}</div>
        </div>
        <FormRow>
          <div style={{ width: '100%' }}>{children}</div>
          <div className={styles.FormButton}>
            <button
              data-testid={TEST_ID.editButton}
              className={styles.FormEdit}
            >
              E
            </button>
          </div>
        </FormRow>
        {editing && <div className={styles.FormError}>{serverError}</div>}
      </form>
    </div>
  )
}

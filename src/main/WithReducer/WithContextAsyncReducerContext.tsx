import React from 'react'

const asyncNoop = (action: any) => Promise.resolve()
export const TodosContext = React.createContext({ todos: [], isLoading: false })
export const ActionContext = React.createContext({ dispatch: asyncNoop })

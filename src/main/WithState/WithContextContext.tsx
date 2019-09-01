import React from 'react'

const noop = () => {}
export const CounterContext = React.createContext(0)
export const ActionContext = React.createContext({ increment: noop })

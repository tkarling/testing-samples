import React, { useState } from 'react'
import './App.css'

import Basic from './main/Basic'
import WithState from './main/WithState/WithState'
import WithAsyncState from './main/WithState/WithAsyncState'
import WithContextAsyncState from './main/WithState/WithContextAsyncStateProvider'
import WithReducer from './main/WithReducer/WithReducer'
import WithAsyncReducer from './main/WithReducer/WithAsyncReducer'
import WithContextAsyncReducer from './main/WithReducer/WithContextAsyncReducer'
import AddTodo from './main/form/AddTodo'
import ShowEditTodo from './main/form/ShowEditTodo'

import LoginOrRegisterForm from './examples/loginForm/LoginOrRegister'

const Row = ({ children }: { children: any }) => (
  <div className="AppRow">{children}</div>
)
const Widget = ({ children }: { children: any }) => (
  <div className="AppItem">{children}</div>
)
const widget = (component: any) => <Widget>{component}</Widget>

const Examples: React.FC = () => (
  <div>
    <Row>{widget(<LoginOrRegisterForm />)}</Row>
  </div>
)

const Main: React.FC = () => (
  <div>
    <Basic />
    <Row>
      {widget(<WithState />)}
      {widget(<WithAsyncState />)}
      {widget(<WithContextAsyncState />)}
    </Row>
    <Row>
      {widget(<AddTodo />)}
      {widget(<ShowEditTodo />)}
    </Row>
    <Row>
      {widget(<WithReducer />)}
      {widget(<WithAsyncReducer />)}
      {widget(<WithContextAsyncReducer />)}
    </Row>
  </div>
)

const App: React.FC = () => {
  const [page, setPage] = useState('main')
  const onClick = () => {
    setPage(page === 'main' ? 'examples' : 'main')
  }

  return (
    <div className="App">
      <Row>
        <button onClick={onClick}>Examples</button>
      </Row>

      {page === 'main' && <Main />}
      {page === 'examples' && <Examples />}
    </div>
  )
}

export default App

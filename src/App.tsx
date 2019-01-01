import React from 'react'
import './App.css'

import Basic from './components/Basic'
import WithState from './components/WithState/WithState'
import WithAsyncState from './components/WithState/WithAsyncState'
import WithContextAsyncState from './components/WithState/WithContextAsyncState'
import WithReducer from './components/WithReducer/WithReducer'
import WithAsyncReducer from './components/WithReducer/WithAsyncReducer'
import WithContextAsyncReducer from './components/WithReducer/WithContextAsyncReducer'

const Row = ({ children }: { children: any }) => (
  <div className="AppRow">{children}</div>
)
const Widget = ({ children }: { children: any }) => (
  <div className="AppItem">{children}</div>
)
const widget = (component: any) => <Widget>{component}</Widget>

const App: React.FC = () => {
  return (
    <div className="App">
      <Basic />
      <Row>
        {widget(<WithState />)}
        {widget(<WithAsyncState />)}
        {widget(<WithContextAsyncState />)}
      </Row>
      <Row>
        {widget(<WithReducer />)}
        {widget(<WithAsyncReducer />)}
        {widget(<WithContextAsyncReducer />)}
      </Row>
    </div>
  )
}

export default App

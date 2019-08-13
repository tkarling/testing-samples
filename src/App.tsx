import React from 'react'
import './App.css'

import Basic from './components/Basic'
import WithState from './components/WithState'
import WithAsync from './components/WithAsync'
import WithReducer from './components/WithReducer'
import WithAsyncReducer from './components/WithAsyncReducer'

const Row = ({ children }: { children: any }) => (
  <div className="row">{children}</div>
)
const Widget = ({ children }: { children: any }) => (
  <div className="item">{children}</div>
)

const App: React.FC = () => {
  return (
    <div className="App">
      <Basic />
      <Row>
        <Widget>
          <WithState />
        </Widget>
        <Widget>
          <WithAsync />
        </Widget>
      </Row>
      <Row>
        <Widget>
          <WithReducer />
        </Widget>
        <Widget>
          <WithAsyncReducer />
        </Widget>
      </Row>
    </div>
  )
}

export default App

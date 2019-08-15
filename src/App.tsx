import React from 'react'
import './App.css'

import Basic from './components/Basic'
import WithState from './components/WithState/WithState'
import WithAsync from './components/WithState/WithAsync'
import WithReducer from './components/WithReducer/WithReducer'
import WithAsyncReducer from './components/WithReducer/WithAsyncReducer'

const Row = ({ children }: { children: any }) => (
  <div className="AppRow">{children}</div>
)
const Widget = ({ children }: { children: any }) => (
  <div className="AppItem">{children}</div>
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

import React from 'react'
import './App.css'

import Basic from './components/Basic'
import WithState from './components/WithState'
import WithAsync from './components/WithAsync'
import WithReducer from './components/WithReducer'
import WithAsyncReducer from './components/WithAsyncReducer'

const App: React.FC = () => {
  return (
    <div className="App">
      <Basic />
      <div className="row">
        <div className="item">
          <WithState />
        </div>
        <div className="item">
          <WithAsync />
        </div>
      </div>
      <div className="row">
        <div className="item">
          <WithReducer />
        </div>
        <div className="item">
          <WithAsyncReducer />
        </div>
      </div>
    </div>
  )
}

export default App

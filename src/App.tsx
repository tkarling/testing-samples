import React from 'react'
import './App.css'

import Basic from './components/Basic'
import WithState from './components/WithState'
import WithAsync from './components/WithAsync'

const App: React.FC = () => {
  return (
    <div className="App">
      <Basic />
      <WithState />
      <WithAsync />
    </div>
  )
}

export default App

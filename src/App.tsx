import React from 'react'
import './App.css'

import Basic from './components/Basic'
import WithState from './components/WithState'

const App: React.FC = () => {
  return (
    <div className="App">
      <Basic />
      <WithState />
    </div>
  )
}

export default App

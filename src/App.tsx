import { Checkbox } from '@mui/material'
import { useState } from 'react'
import './App.css'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function App() {


  return (
    <div className="App">
      <Checkbox {...label} defaultChecked />
    </div>
  )
}

export default App

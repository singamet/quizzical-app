import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Start from './components/Start'
import Quiz from './components/Quiz'

function App() {
  const [start, setStart] = useState(false)
  function startQuiz() {
    setStart(prev => !prev)
  }
  return (
    <main className='main-container'>
      {start ? <Quiz/> : <Start start={startQuiz} />}

    </main>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import TasksPage from './pages/TasksPage'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<TasksPage />} />
        <Route path='/:id' element={<TasksPage />} />
      </Routes>
    </div>
  )
}

export default App

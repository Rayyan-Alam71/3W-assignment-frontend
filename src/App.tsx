import './App.css'
import Heading from './components/Heading'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import AddUser from './components/AddUser'

function App() {

  return (
    <BrowserRouter>
    <Heading/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add-user' element={<AddUser/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

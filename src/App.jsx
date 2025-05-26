import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './screens/Auth/Login'
import Signup from './screens/Auth/Signup'
import AddCart from './screens/User/AddCart'
import Home from './screens/User/Home'
import Product from './screens/User/Product'
import Admin from './screens/User/Dashboard.jsx'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/addCart' element={<AddCart/>}/>
      <Route path='/product' element={<Product/>}/>
      
      <Route path='/dashboard' element={<Admin/>}/>
    </Routes>
  )
}

export default App

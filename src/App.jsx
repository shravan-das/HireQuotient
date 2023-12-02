import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import {Route,Routes} from 'react-router-dom'

function App() {
  
  return (

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>

    </Routes>
    

    
  )
}

export default App

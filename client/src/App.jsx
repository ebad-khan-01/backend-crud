import 'bootstrap/dist/css/bootstrap.min.css'; 
import Navbar from "./Navbar"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Create from './component/Create';
import Read from './component/Read';
import Update from './component/Update';

function App() {


  return (
    <>  
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/all" element={<Read/>} />
        <Route path="/:id" element={<Update/>} />
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Pages/HomePage';
import CustomerLogin from './Components/CustomerLogin';
import AnalysisPage from './Pages/AnalysisPage';
import RegistrationPage from './Components/Navbar/RegistrationPage';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
     <Route path='/' element={<HomePage/>}/>
     <Route path='/login' element={<CustomerLogin/>}/>
     <Route path='/RegistrationPage' element={<RegistrationPage/>}/>
     <Route path='/analysispage' element={<AnalysisPage/>}/>
      </Routes>
     
      </BrowserRouter>
   
    </div>
  );
}

export default App;

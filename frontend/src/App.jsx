import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Doctoros } from './pages/Doctors';
import { Login } from './pages/Login';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { MyProfile } from './pages/MyProfile';
import { MyAppointments } from './pages/MyAppointment';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Appointment } from './pages/Appointment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctoros />} />
        <Route path='/doctors/:speciality' element={<Doctoros />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

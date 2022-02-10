import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './components/Home/Home';
import AddFoods from './components/AddFoods/AddFoods';
import EditFoods from './components/EditFoods/EditFoods'
import AddStudent from './components/AddStudents/AddStudents';
import EditStudents from './components/EditStudents/EditStudent'
import ServeModal from './components/ServeModal/ServeModal';
import Distributed from './components/Distributed/Distributed';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addFood" element={<AddFoods />} />
          <Route path="/editFood/:id" element={<EditFoods />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/editStudent/:id" element={<EditStudents />} />
          <Route path="/modal/:id" element={<ServeModal />} />
          <Route path="/distributed" element={<Distributed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from "./Register";
import StudentList from "./StudentList";
import StudentEdit from "./StudentEdit";

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/List" element={<StudentList />} />
                <Route path="/List/:id" element={<StudentEdit />}/>
            </Routes>
        </div>
    </Router> 
  
  );
}

export default App;

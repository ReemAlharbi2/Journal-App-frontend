import React, { useEffect } from 'react';
import './App.css';


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NotesList from './components/NotesList';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';

function App() {



  return (
    <>
   
    <Router>
      <div >
        <nav>
          
          <Link to="/notes">Notes</Link> | <Link to="/add">Add Note</Link>

        </nav>
        <h1>Journal app</h1>
        {/* <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path ="/register" element={<Register/>}/>
          <Route path="/notes" element={<NotesList />} />
          <Route path="/add" element={<AddNote />} />
          <Route path = "/edit/:id" element={<EditNote/>}/>

        </Routes> */}



      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<PrivateRoute><NotesList /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddNote /></PrivateRoute>} />
        <Route path="/edit/:id" element={<PrivateRoute><EditNote /></PrivateRoute>} />
        <Route path="*" element={<Login />} />
      </Routes>
  


      </div>
    </Router>
    </>
  );
}

export default App;
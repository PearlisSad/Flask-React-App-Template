import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './component/Navbar';
import ToDoList from './page/ToDoList';

function App() {{/**/}
    return (
        <div>
          <Navbar /> 
          <BrowserRouter>
            <Routes>
              <Route index element = {<ToDoList />} />
              <Route path='/todolist' element ={<ToDoList />} />
              </Routes>
          </BrowserRouter>
        </div>
      );
}

export default App;

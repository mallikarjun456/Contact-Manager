import React from "react";
import "./index.css";

import NavBar from "./components/NavBar/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import ViewContact from "./components/Contacts/ViewContact/ViewContact";
import AddContact from "./components/Contacts/AddContact/AddContact";
import ContactList from "./components/Contacts/ContactList/ContactList";
import EditContact from "./components/Contacts/EditContact/EditContact";
 import Spinner from "./components/Spinner/Spinner";


function App() {
  return (
    <div className="App">
      <React.Fragment>
              {/* <Spinner /> */}
        <NavBar/>
        <Routes>
        <Route path={'/'} element={<Navigate to={'/Contacts/list'}/>}/>
        <Route path={'/Contacts/list'} element={<ContactList/>}/>
        <Route path={'/Contacts/add'} element={<AddContact/>}/>
        <Route path={'/Contacts/view/:contactId'} element={<ViewContact/>}/>
        <Route path={'/Contacts/edit/:contactId'} element={<EditContact/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;




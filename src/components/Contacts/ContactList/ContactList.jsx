import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/ContactService/ContactService";
import Spinner from "../../Spinner/Spinner";

const ContactList = () => {
    let [query, setQuery] = useState({
        text:''
    })
    let [state, setState] = useState({ loading: false, contacts: [], filteredcontacts: [],errorMessage :''})
    useEffect(() => {
        let promise = new Promise((res, rej) => {
            setState({ ...state, loading: true })
            let response = ContactService.getAllContacts()
            res(response)
            rej("error")
        })
        promise.then((res) => {
          console.log(res.data)
            setState({ ...state, loading: false, contacts: res.data, filteredcontacts: res.data })
        }).catch(() => {
            alert("Error while fetching data !!!")
            setState({ ...state, loading: false, errorMessage: "Error Message" })
        })
    }, []);
    let clickDelete = (contactId) => {
        let response = ContactService.deleteContact(contactId)
        if (response) {
            let promise = new Promise((res, rej) => {
                setState({ ...state, loading: true })
                let response = ContactService.getAllContacts()
                res(response)
                rej("error")
            })
            promise.then((res) => {

                console.log(res.data)
                setState({ ...state, loading: false, contacts: res.data, filteredcontacts: res.data })
            })
        } else {

            alert("Error while fetching data !!!")
            setState({ ...state, loading: false, errorMessage: "Error Message" })
        }  
    }
    let searchContacts = (event) => {
        setQuery({
            ...query,
            text: event.target.value
        });
        let theContacts = state.contacts.filter(contacts => {
            return contacts.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setState({
            ...state,
            filteredcontacts: theContacts
        });
    };
    let { loading, contacts, filteredcontacts,errorMessage}=state

  return (
    <div>
      <React.Fragment>
        {/* <pre>{query.text}</pre> */}
        <section className="contact-search p-3">
          <div className="container">
            <div className="grid">
              <div className="row">
                <p className="h3">Contact Manager{" "}
                  <Link to={"/Contacts/add"} className="btn btn-primary"><i className="fa fa-plus-circle me-2" />Add</Link>
                </p>
                <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit.Molestiae, iusto?
                </p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <form className="row">
                    <div className="col mb-2">
                        <input name="text" value={query.text} onChange={searchContacts } type="text" placeholder="search names" className="form-control" />
                    </div>
                    <div className="col mb-2">
                      <input type="submit" className="btn btn-outline-dark" value="Search"/>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {
          loading?<Spinner/>:<React.Fragment>
        <section className='Contact-List'>
          <div className="container">
            <div className="row">
            {
               filteredcontacts.length>0 && filteredcontacts.map((contacts)=>{
                  return(
                    <div className="col-md-6" key={contacts.id}>
                    <div className="card my-2">
                      <div className="card-body">
                        <div className="row d-flex align-items-center">
                          <div className="col-md-4 ">
                            <img src={contacts.photo}  className="imgstyle" alt="" />
                          </div>
                          <div className="col-md-7">
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-action">Name : <span className="fw-bold">{contacts.name}</span></li>
                              <li className="list-group-item list-group-item-action">Contact : <span className="fw-bold">{contacts.mobile}</span></li>
                              <li className="list-group-item list-group-item-action">Email : <span className="fw-bold">{contacts.email}</span></li>
                            </ul> 
                          </div>
                          <div className="col-md-1 d-flex flex-column align-item-center p-1">
                           <Link to={`/Contacts/view/${contacts.id}`} className="btn btn-warning my-1"><i className="fa fa-eye"></i></Link>
                                          <Link to={`/Contacts/edit/${contacts.id}`} className="btn btn-primary my-1"><i className="fa fa-pen"></i></Link>
                                          <button className="btn btn-danger" onClick={()=>clickDelete(contacts.id) }><i className="fa fa-trash"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
                })
            }

            </div>
          </div>
        </section>

    </React.Fragment>
}

       </React.Fragment>    
    </div>
  );
};

export default ContactList;

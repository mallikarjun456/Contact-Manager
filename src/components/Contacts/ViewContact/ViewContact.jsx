import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../../../services/ContactService/ContactService";
import Spinner from "../../Spinner/Spinner";

const ViewContact = () => {
     let {contactId}=useParams();
    let [state, setState] = useState({ loading: false, contacts: {}, errorMessage: '', groups: {} });
       useEffect(()=>{
           let promise = new Promise((res, rej) => {
               setState({ ...state, loading: true })
               let response = ContactService.getContact(contactId)
               //let groupResponse = ContactService.getGroup(response.data)
         res(response)
               rej("error")
         
       })
       promise.then((res)=>{
        
           console.log(res.data)
           setState({ ...state, loading: false, contacts: res.data});
       }).catch(()=>{
         alert("Error while fetching data !!!")
         setState({...state,loading:false,errorMessage:"Error Message"})
       })
     },[contactId])
     let {loading,contacts,errorMessage}=state
  return (
    <div>
          <React.Fragment>
              {
                  loading ? <Spinner /> : <React.Fragment>
                      { Object.keys(contacts).length > 0 &&
                     <>
        <section className="add-contact">
          <div className="container p-3">
            <div className="row">
               <div className="col">
                  <p className="text-warning h4 fw-bold">View Contact</p>
                  <p className="fst-italic">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus
                    consectetur eveniet voluptate dolore corrupti saepe soluta a.
                    Id, sed expedita, impedit nisi quae ut maxime recusandae
                    distinctio ipsum fugiat sequi.
                  </p>
               </div>
            </div>
          </div>
        </section>
        
            <section className="add-contact" >
              <div className="container">
                <div className="row">
                  <div className="col-md-2 align-items-center my-3">
                     <img src={contacts.photo} height="200px" width="200px" alt="" />
                   </div>
                </div>
                 <div className="row">
                   <div className="col-md-6" key={contacts.id}>
                     <div className="card ">
                        <ul className="list-group">
                          <li className="list-group-item list-group-item-action">
                            Name : <span className="fw-bold">{contacts.name}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            Contact : <span className="fw-bold">{contacts.mobile}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            Email :{" "}
                            <span className="fw-bold">{contacts.email}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            Company Name : <span className="fw-bold">{contacts.company}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            Title : <span className="fw-bold">{contacts.title}</span>
                          </li>
                          <li className="list-group-item list-group-item-action">
                            Selected Group : <span className="fw-bold">{contacts.group}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Link to={"/Contacts/list"} className="btn btn-warning mt-2">
                        Back
                      </Link>
                    </div>
                  </div>
            </div>
            
                          </section>
                      </>
                      }
                  </React.Fragment>
              
              
        }
      </React.Fragment>
    </div>
  );
};

export default ViewContact;

import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService/ContactService";
import Spinner from "../../Spinner/Spinner";
import { useEffect } from "react";


const AddContact = () => {
    let navigate = useNavigate();
    let [state, setState] = useState({
        loading: false,
        contacts: { name: '', photo: '', mobile: '', email: '', company: '', title: '', group: '' },
        groups: [],
        errorMessage: '',
        /*group: {}*/
    });
    
    let updateInput = (event) => {
        setState({
            ...state,
            contacts: {
                ...state.contacts,
                [event.target.name]: event.target.value
            }
        });
    };

   
    let submitForm = async (event) => {
        event.preventDefault();
        try {
            let response = await ContactService.createContact(state.contacts);
            if (response) {
                navigate(`/contacts/list`, { replace: true });
            }
        }
        catch (error) {
            setState({
                ...state,
                errorMessage: error.message
            });
            navigate(`/contacts/add`, { replace: false });
        }
    }
    let { loading, contacts, groups, errorMessage } = state;
  return (
    <div>
          <React.Fragment>
            {/* <pre>{JSON.stringify(state.contacts)}</pre> */}
        <section className='add-contact'>
          <div className="container p-3" >
            <div className="row">
              <p className='text-success h4 fw-bold'>Create Contact</p>
              <p className='fst-italic'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus consectetur eveniet voluptate dolore corrupti saepe soluta a. Id, sed expedita, impedit nisi quae ut maxime recusandae distinctio ipsum fugiat sequi.</p>
            </div>
            <div className="row">
              <div className="col-md-4">
                <form onSubmit={submitForm}>
                    <div className="mb-2">
                    <input required={true} name="name" value={contacts.name} onChange={updateInput} type="text" placeholder='Name' className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input required={true} name="photo" value={contacts.photo} onChange={updateInput} type="text" placeholder='Photo URL' className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input required={true}  name="mobile" value={contacts.mobile} onChange={updateInput} type="number" placeholder='Mobile' className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input required={true} name="email" value={contacts.email} onChange={updateInput} type="email" placeholder='Email' className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input required={true}  name="company" value={contacts.company} onChange={updateInput} type="text" placeholder='Company Name' className='form-control' />
                  </div>
                  <div className="mb-2">
                    <input required={true} name="title" value={contacts.title} onChange={updateInput} type="text" placeholder='Title' className='form-control' />
                  </div>
                  <div className="mb-2">
                                      <select  name="group" value={contacts.group} onChange={updateInput} className='form-control'>
                                          <option value=''>Select Group</option>
                                         
                </select>
                   </div>
                   <div className="mb-2">
                   <input className="btn btn-success" type="submit" value="Create"/>
                   <Link to={'/Contacts/list'}  className="btn btn-outline-dark mx-2">Cancel</Link>

                   </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    </div>
  );
};

export default AddContact

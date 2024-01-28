
import React from 'react'
import { useEffect,useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService/ContactService';
import Spinner from '../../Spinner/Spinner';

const EditContact = () => {
    let { contactId } = useParams();
    let navigate = useNavigate();
    let [state, setState] = useState({
        loading: false,
        contacts: { name: '', photo: '', mobile: '', email: '', company: '', title: '', group: '' },
        groups: [],
        errorMessage: '',
        
    });
    useEffect(() => {
        let promise = new Promise((res, rej) => {
            setState({ ...state, loading: true })
            let response = ContactService.getContact(contactId)
            res(response)
            rej("error")
        })
        promise.then((res) => {
            console.log(res.data)
            setState({ ...state, loading: false, contacts: res.data })
        }).catch(() => {
            alert("Error while fetching data !!!")
            setState({ ...state, loading: false, errorMessage: "Error Message" })
        })
    }, [contactId]);

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
            let response = await ContactService.updateContact(state.contacts, contactId);
            if (response) {
                navigate(`/contacts/List`, { replace: true });
            }
        }
        catch (error) {
            setState({
                ...state,
                errorMessage: error.message
            });
            navigate(`/contacts/edit/${contactId}`, { replace: false });
        }
    }

    let { loading, contacts, groups, errorMessage } = state;
  return (
    <div>
          <React.Fragment>
              {/* <pre>{JSON.stringify(contacts)}</pre>*/}
              {
                  loading ? <Spinner /> : <React.Fragment>
              
                      <section className='edit-contact'>
                          <div className="container p-3" >
                              <div className="row">
                                  <p className='text-primary h4 fw-bold'>Edit Contact</p>
                                  <p className='fst-italic'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus consectetur eveniet voluptate dolore corrupti saepe soluta a. Id, sed expedita, impedit nisi quae ut maxime recusandae distinctio ipsum fugiat sequi.</p>
                              </div>
                              <div className="row ">
                                  <div className="col-md-4">
                                      <form onSubmit={submitForm}>
                                          <div className="mb-2">
                                              <input required={true} name="name" onchange={updateInput} value={contacts.name} type="text" placeholder='Name' className='form-control' />
                                          </div>
                                          <div className="mb-2">
                                              <input required={true} name="photo" onchange={updateInput} value={contacts.photo} type="text" placeholder='Photo URL' className='form-control' />
                                          </div>
                                          <div className="mb-2">
                                              <input required={true} name="mobile" onchange={updateInput} value={contacts.mobile} type="number" placeholder='Mobile' className='form-control' />
                                          </div>
                                          <div className="mb-2">
                                              <input required={true} name="email" onchange={updateInput} value={contacts.email} type="email" placeholder='Email' className='form-control' />
                                          </div>
                                          <div className="mb-2">
                                              <input required={true} name="company" onchange={updateInput} value={contacts.company} type="text" placeholder='Company Name' className='form-control' />
                                          </div>
                                          <div className="mb-2">
                                              <input required={true} name="title" onchange={updateInput} value={contacts.title} type="text" placeholder='Title' className='form-control' />
                                          </div>
                                          <div className="mb-2">
                                              <select required={true} name="group" onchange={updateInput}value={contacts.group}  id='' className='form-control' >
                                                  <option value=''>Select Group</option>
                                              </select>
                                          </div>
                                          <div className="mb-2">
                                              <input className="btn btn-primary" type="Submit" value="Update" />
                                              <Link to={'/Contacts/list'} className="btn btn-danger ms-2">Cancel</Link>
                                          </div>
                                      </form>
                                  </div>
                                  <div className="col-md-2 align-items-center my-5">
                                      <img src={ contacts.photo} height="200px" width="200px" alt="" />
                                  </div>
                              </div>
                          </div>
                      </section>

                  </React.Fragment>
              }
      </React.Fragment>
    </div>
  )
}


export default EditContact

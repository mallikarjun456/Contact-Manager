import React from 'react'
import spinnerImg from "../../components/asset/img/spinner.gif"

const Spinner = () => {
  return (
    <div>
      <React.Fragment>
        <img src={spinnerImg} alt='' className="d-flex m-auto"
        style={{height:"70px",width:"100px"}}/>
      </React.Fragment>
    </div>
  )
}

export default Spinner

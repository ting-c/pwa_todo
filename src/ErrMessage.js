import React from 'react'

const ErrMessage = ({ message }) => {
  return (
    <React.Fragment>
      <br />
      <div className="alert alert-danger alert-dismissible fade show m-3" role="alert">
        { message }
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </React.Fragment>
  )
}

export default ErrMessage

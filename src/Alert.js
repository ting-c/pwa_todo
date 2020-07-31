import React, { useEffect} from 'react'

const Alert = ({ message, type='primary', setIsShowAlert }) => {

  useEffect(() => {
    const timeout = setTimeout(() => setIsShowAlert(false), 3000)
    return () => {
      clearTimeout(timeout)
    }
  })


  return (
		<div class={`alert alert-${type}`} role="alert">
			{message}
		</div>
	);
}

export default Alert

import React from 'react'

const LoadingSpinner = () => {
  return (
		<div className="p-3 d-flex justify-content-center">
			<div
				className="spinner-grow text-primary row d-flex justify-content-center"
				role="status"
			>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}

export default LoadingSpinner

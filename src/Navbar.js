import React from 'react';

const Navbar = ({ setIsShowSidebar, isShowSidebar }) => {
  return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
			<button
				className="navbar-toggler"
				type="button"
				onClick={() => setIsShowSidebar(!isShowSidebar)}
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
		</nav>
	);
}

export default Navbar

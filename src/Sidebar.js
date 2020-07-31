import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ uniqueCategories, setIsShowSidebar, setCategoryFilter }) => {
	const [isShowCategories, setIsShowCategories] = useState(false);

	return (
		<div
			className="sidebar bg-light p-2 animate__animated animate__slideInLeft"
			style={{
				zIndex: "2",
				height: "100vh",
				width: "15rem",
				position: "fixed",
				opacity: '0.9',
				fontSize: '1.4rem'
			}}
		>
			<div className="p-2">
				<Link
					to="/"
					onClick={() => {
						setIsShowSidebar(false);
						setCategoryFilter(null);
					}}
					style={{ textDecoration: "none", color: "black" }}
				>
					All Tasks
				</Link>
			</div>
			<div
				className="p-2"
				onClick={() => setIsShowCategories(!isShowCategories)}
			>
				Categories
				<span className="px-1">{isShowCategories ? "▿" : "▹"}</span>
			</div>
			{isShowCategories ? (
				uniqueCategories.length ? (
					uniqueCategories.map((category, idx) => (
						<Link
							to="/"
							onClick={() => setIsShowSidebar(false)}
							style={{
								textDecoration: "none", color: "black",
								fontWeight: 'lighter' }}
							key={idx}
						>
							<div
								className="animate__animated animate__fadeInDown px-3 py-2"
								onClick={() => setCategoryFilter(category)}
							>
								{category}
							</div>
						</Link>
					))
				) : (
					<div className="text-muted small font-italic">None added</div>
				)
			) : null}
		</div>
	);
};

export default Sidebar;

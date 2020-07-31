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
				width: "10rem",
				position: "fixed",
			}}
		>
			<div className="font-weight-bold">
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
				className="font-weight-bold"
				onClick={() => setIsShowCategories(!isShowCategories)}
			>
				Categories
				<span className="ml-1">{isShowCategories ? "▿" : "▹"}</span>
			</div>
			{isShowCategories ? (
				uniqueCategories.length ? (
					uniqueCategories.map((category, idx) => (
						<Link
							to="/"
							onClick={() => setIsShowSidebar(false)}
							style={{ textDecoration: "none", color: "black" }}
							key={idx}
						>
							<div
								className="animate__animated animate__fadeInDown px-1"
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

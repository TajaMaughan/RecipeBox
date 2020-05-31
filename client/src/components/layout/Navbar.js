import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {
	return (
		<nav className="cyan darken-2">
			<div className="nav-wrapper">
				<a href="/" className="brand-logo center">
					Recipe Box
				</a>
				<ul id="nav-mobile" className="left hide-on-med-and-down">
					<li>
						<a href="/">Recipe Feed</a>
					</li>
					<li>
						<a href="/recipes">My Recipes</a>
					</li>
				</ul>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li>
						<a href="/login">Login</a>
					</li>
					<li>
						<a href="/register">Register</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
};

Navbar.defaultProps = {
	title: 'Recipe Box',
	icon: 'fas fa-book-open'
};

export default Navbar;

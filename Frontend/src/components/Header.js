import React from 'react';
import NavBar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import Login from './Login';


function Header() {
	return (
		<NavBar className="bg-info">
			<NavBar.Brand href="/">RecipeBox</NavBar.Brand>
			<Nav>
				<Nav.Link href="/">Home</Nav.Link>
				<Nav.Link href="/recipes">Recipes</Nav.Link>
			</Nav>
			<NavBar.Collapse className="justify-content-end">
				<Login />
			</NavBar.Collapse>
		</NavBar>
	);
}

export default Header;

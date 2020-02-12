import React from 'react';
import NavBar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';


function Header() {
	return (
		<NavBar className="bg-info">
			<NavBar.Brand href="/">RecipeBox</NavBar.Brand>
			<Nav>
				<Nav.Link href="/">Home</Nav.Link>
				<Nav.Link href="/recipes">Recipes</Nav.Link>
			</Nav>
			<NavBar.Collapse className="justify-content-end">
				<Button variant="outline-light" href="/login">Login</Button>
			</NavBar.Collapse>
		</NavBar>
	);
}

export default Header;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar.js';
import Feed from './components/pages/Feed.js';
import Recipes from './components/pages/Recipes.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

const App = () => {
	useEffect(() => {
		// Init Materialze JS
		M.AutoInit();
	});
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Switch>
					<Route exact path="/" component={Feed} />
					<Route exact path="/recipes" component={Recipes} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;

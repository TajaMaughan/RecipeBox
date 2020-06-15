import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar.js';
import Feed from './components/pages/Feed.js';
import Home from './components/pages/Home.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';

import RecipeState from './context/recipe/RecipeState';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const App = () => {
	useEffect(() => {
		// Init Materialze JS
		M.AutoInit();
	});
	return (
		<RecipeState>
			<Router>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/" component={Feed} />
						<Route exact path="/recipes" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
					</Switch>
				</div>
			</Router>
		</RecipeState>
	);
};

export default App;

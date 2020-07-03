import * as React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Home from './Home';
import CreateChirp from './createChirp';
import EditChirp from './editChirp'
import Logo from './bird.png';


class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {
			name: null
		};
	}

	async componentDidMount() {
	}

	render() {
		return (
			<React.Fragment>
				

				<Router>
					<div
					>
					
					</div>
					<nav className="navbar navbar-dark bg-primary justify-content-between">
						<a className="navbar-brand navbar-primary" href="http://localhost:3000/" >
							<img src={Logo} id="birdLogo" width="30" height="30" className="d-inline-block align-top" alt="" />
                    Chirper
                    </a>
						<div>
							<button type="button" id="addButton" className="btn btn-dark btn-link"><Link to="/chirp/add">Add Chirp</Link></button>
							<Link to="/chirp/test">Test</Link>
						</div>

					</nav>

					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/chirp/add' component={CreateChirp} />
						<Route path='/chirp/edit/:id' component={EditChirp} />
					</Switch>
				</Router>
			</React.Fragment>
		);
	}
}

export interface IAppProps {
}

export interface IAppState {
}

export default App;

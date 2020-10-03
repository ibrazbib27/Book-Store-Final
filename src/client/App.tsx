import * as React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BooksNavbar from "./components/books_navbar/BooksNavbar";


export interface bookType
{
	id: number;
	title: string;
	author: string;
	price: number;
	name: string;
	categoryid: number;
}
interface AppProps {}

const App: React.FC<AppProps> = (props) => {

	return (
		<Router>
			<Switch>
				{['/'].map((path) => (
					<Route
					exact
					path={path}
					key={path}
					render={(props) => (
						<>
							<BooksNavbar  history={props.history} location={props.location} match={props.match} />
							<Container fluid className={'bg-color w-100 d-flex align-items-center justify-content-center min-vh-100'}>
								<p className={'display-2'}>Welcome!</p>
							</Container>
						</>
					)}
					/>
				))}
				{['/login', '/register'].map((path) => (
					<Route
						exact
						path={path}
						key={path}
						render={(props) => (
							<>
								<BooksNavbar  history={props.history} location={props.location} match={props.match} />
								<Container fluid className={'bg-color w-100 d-flex justify-content-center min-vh-100 p-0'}>
									<Row className={'w-100 align-items-center justify-content-center p-0 mb-0 mx-0 mt-5'}>
										<Col xs={11} sm={10} md={9} lg={8} xl={7}>

										</Col>

									</Row>
									<p className={'display-2'}>Welcome!</p>
								</Container>
							</>
						)}
					/>
				))}
			</Switch>
		</Router>
	);
};


export default App;

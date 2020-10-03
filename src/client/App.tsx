import * as React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BooksNavbar from "./components/books_navbar/BooksNavbar";
import Account from './components/account/Account';
import Books from "./components/books/Books";


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
				{['/books/new', '/books/:id/update'].map((path) => (
					<Route
						path={path}
						exact
						key={path}
						render={(props) => (
							<>
								<BooksNavbar  history={props.history} location={props.location} match={props.match} />
								<Container fluid className={'d-flex justify-content-center bg-color min-vh-100 p-0'}>
									<Row className={'justify-content-center align-items-center w-100 p-0 mb-0 mx-0 mt-5'}>
										<Col xl={7} lg={8} md={9} sm={10} xs={11}>

										</Col>
									</Row>
								</Container>
							</>
						)}
					/>
				))}
				{['/books', '/books/:id'].map((path) => (
					<Route
						exact
						path={path}
						key={path}
						render={(props) => (
							<>
								<BooksNavbar  history={props.history} location={props.location} match={props.match} />
								<Container fluid className={'bg-color w-100 d-flex align-items-center justify-content-center min-vh-100 p-0'}>
									<Books  history={props.history} location={props.location} match={props.match} />
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
								<Account authType={path === '/login'} history={props.history} location={props.location} match={props.match}/>
										</Col>
									</Row>
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

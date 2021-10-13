import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ProductList from './pages/ProductList/ProductList';
import SignIn from './pages/Sign/SignIn/SignIn';
import SignUp from './pages/Sign/SignUp/SignUp';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <>
            <Nav />
            <Route exact path="/" component={Main} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/products/:id" component={ProductDetail} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Footer />
          </>
        </Switch>
      </Router>
    );
  }
}

export default Routes;

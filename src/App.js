import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './components/layout/Navbar' 
import Index from './components/layout/Index'
import Lyrics from './components/tracks/Lyrics'
import { Provider } from './context';
import { Container } from 'reactstrap'

class App extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <React.Fragment>
            <NavBar />
            <Container>
              <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/lyrics/track/:id" component={Lyrics} />
              </Switch>
            </Container>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

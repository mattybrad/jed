import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import Main from './components/Main';
import classNames from 'classnames';
import styles from './index.css';
import * as Pages from './pages';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

const store = createStore(
  rootReducer,
  applyMiddleware(
  	thunkMiddleware
  )
);

class App extends React.Component {

  render() {
    return(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Main}>
            <IndexRoute component={Pages.Home} />
            <Route path="test" component={Pages.Test} />
          </Route>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

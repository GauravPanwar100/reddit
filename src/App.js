import {
  BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";
import './App.css';
import Home from './components/home/Home';
import Subreddit from "./components/subredditPage/Subreddit";
import Demo from "./Demo";

// redux
import {Provider} from 'react-redux';
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/">
                <Home/>
                {/* <Demo /> */}
            </Route>
            <Route path="/subreddit">
                <Subreddit/>
            </Route>
        </Switch>
      </Router>
    </div>
    </Provider>
  );
}

export default App;

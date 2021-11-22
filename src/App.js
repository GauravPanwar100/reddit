import {
  BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";
import './App.css';
import Goal from './components/goal/Goal';
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
                <Goal/>
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

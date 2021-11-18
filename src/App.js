import {
  BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";
import './App.css';
import Home from './components/home/Home';
import Subreddit from "./components/subredditPage/Subreddit";
import Demo from "./Demo";

function App() {
  return (
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
  );
}

export default App;

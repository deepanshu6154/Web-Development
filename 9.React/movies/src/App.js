import Movie from './Components/Movie';
import './App.css';
import Home from './Components/Home'
import About from './Components/About'
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} exact ></Route>
        <Route path='/about' component={About}></Route>
        <Route path='/movie' component={Movie}></Route>
      </Switch>
    </Router>
  );
}

export default App;

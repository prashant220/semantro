
import './App.css';
import { Route, Switch,BrowserRouter } from 'react-router-dom'
import Contact from './Component/Contact';
import About from './Component/About';
import Home from './Component/Home';

function App() {
  return (
    <div className="App">
         <BrowserRouter  basename='/speech'> 
      <Switch>
      <Route component={Home}   exact path="/"></Route>
      <Route component={Contact}    path="/contact"></Route>
      <Route component={About}    path="/about"></Route>
 </Switch>
 </BrowserRouter> 
    </div>
  );
}

export default App;

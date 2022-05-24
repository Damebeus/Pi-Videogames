import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Card from "./components/Card";
import VideogameCreate from "./components/VideogameCreate";
import Detail from "./components/Detail";
import Error404 from "./components/Error404";
import Ankaramessi from "./components/Ankaramessi";
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component={Home} />
          <Route exact path='/createGame' component={VideogameCreate} />
          <Route path='/card' component={Card} />
          <Route exact path='/videogame/:id' component={Detail} />
          <Route exact path='/ankaramessi' component={Ankaramessi} />
          <Route path='*' component={Error404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

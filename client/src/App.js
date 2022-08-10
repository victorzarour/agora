import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Agenda from "./Agenda";
import Calendaire from "./Calendaire";
import Home from "./components/Home";
import Table from "./Table";

function App() {
  const [currentUser, setCurrentUser] = useState(false)

  useEffect(() => {
    fetch('/authorized_user')
    .then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setCurrentUser(user);
        });
      } else {
        response.json().then( (json) => {
          if (json.errors !== undefined) {
            alert(json.errors);
          }
        });
      }
    })
  },[]);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/testing">
            <h1>Test Route</h1>
          </Route>
          <Route path="/chicho">
            <Calendaire />
          </Route>
          <Route path="/agenda">
            <Agenda />
          </Route>
          <Route path="/table">
            <Table />
          </Route>
          <Route path="/">
            <Home setCurrentUser={ setCurrentUser } currentUser={currentUser}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
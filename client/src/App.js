import { BrowserRouter, Switch, Route } from "react-router-dom";
import Assignment from "./components/Assignment";
import AssignmentList from "./components/AssignmentList";
import CourseDetails from "./components/CourseDetails";
import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Syllabus from "./components/Syllabus";
import Table from "./Table";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/assignments/:id">
            <Assignment />
          </Route>
          <Route exact path="/professors/:id/courses">
            <CourseList />
          </Route>
          <Route exact path="/courses/add">
            <CourseForm />
          </Route>
          <Route exact path="/courses/:id">
            <CourseDetails />
          </Route>
          <Route exact path="/syllabus/:id">
            <Syllabus />
          </Route>
          <Route exact path="/course/:id/assignments">
            <AssignmentList />
          </Route>
          <Route exact path="/table">
            <Table />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
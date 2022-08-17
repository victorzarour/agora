import { BrowserRouter, Switch, Route } from "react-router-dom";
import Announcement from "./components/Announcement";
import AnnouncementList from "./components/AnnouncementList";
import Assignment from "./components/Assignment";
import AssignmentList from "./components/AssignmentList";
import CourseDetails from "./components/CourseDetails";
import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";
import StudentList from "./components/StudentList";
import CourseListStudent from "./components/CourseListStudent";
import Discussion from "./components/Discussion";
import DiscussionList from "./components/DiscussionList";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Syllabus from "./components/Syllabus";
import Table from "./Table";
import StudentDetails from "./components/StudentDetails";
import StudentGrades from "./components/StudentGrades";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/assignments/:id">
            <Assignment />
          </Route>
          <Route exact path="/announcements/:id">
            <Announcement />
          </Route>
          <Route exact path="/course/:id/discussion_board">
            <DiscussionList />
          </Route>
          <Route exact path="/discussions/:id">
            <Discussion />
          </Route>
          <Route exact path="/professors/:id/courses">
            <CourseList />
          </Route>
          <Route exact path="/students/:id/courses">
            <CourseListStudent />
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
          <Route exact path="/course/:id/announcements">
            <AnnouncementList />
          </Route>
          <Route exact path="/course/:id/students">
            <StudentList />
          </Route>
          <Route exact path="/course/:id/students/:id">
            <StudentDetails />
          </Route>
          <Route exact path="/course/:id/grades">
            <StudentGrades />
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
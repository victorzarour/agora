import { NavLink, useHistory } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../context/user";
import { useEffect, useState } from "react";
import CourseForm from './CourseForm'

function CourseList( ){
    const { user } = useContext(UserContext)
    const [courses, setCourses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
        fetch(`/professors/${user?.id}/courses`)
        .then((r) => r.json())
        .then(courses => {
        setCourses(courses);
        setIsLoaded(true)
    })
    }, [])

    if (!isLoaded) return <h2>Loading...</h2>

    function toggleShowForm(){
        setShow(!show)
    }

    return (
        <div>

            Welcome, {user?.first_name}

            {courses.map(course => {
                return (
                    <NavLink to={`/courses/${course.id}`}>
                        <p><span>{course.title}</span></p>
                    </NavLink>
                    )} )
             }

            <button onClick={toggleShowForm}>Add a course</button>
            <div className={show ? "show" : "hide"}> 
                <CourseForm setCourses={setCourses} courses={courses}/>
            </div>

         </div>
    )
}

export default CourseList
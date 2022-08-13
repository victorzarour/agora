import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../context/user";
import { useEffect, useState } from "react";
import CourseForm from './CourseForm'

function CourseList( ){
    const { user } = useContext(UserContext)
    const [courses, setCourses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [show, setShow] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        fetch(`/professors/${id}/courses`)
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

            {courses?.map(course => {
                return (
                    <p>
                        <NavLink to={`/courses/${course.id}`}>
                            <span>{course.title}</span>
                        </NavLink>
                        <span>, {course.university}</span>
                        {/* <span>, {course.department}</span> */}
                        <span>, {course.days}</span>
                        <span>, {course.code}</span>
                    </p>

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
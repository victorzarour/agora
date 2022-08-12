import { NavLink, useHistory } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../context/user";
import { useEffect, useState } from "react";

function CourseList( ){
    const { user } = useContext(UserContext)
    const [courses, setCourses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch(`/professors/${user?.id}/courses`)
        .then((r) => r.json())
        .then(courses => {
        setCourses(courses);
        setIsLoaded(true)
    })
    }, [])

    if (!isLoaded) return <h2>Loading...</h2>

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

            <NavLink to='/courses/add'>
                <p>Add course</p>
            </NavLink>

         </div>
    )
}

export default CourseList
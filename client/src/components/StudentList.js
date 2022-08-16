import { useState, useEffect } from "react";
import { useParams, NavLink, useHistory } from 'react-router-dom'

function StudentList(){
    const [courseStudents, setCourseStudents] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        fetch(`/courses/${id}/students`)
        .then((r) => r.json())
        .then(courseStudents => {
        setCourseStudents(courseStudents);
        setIsLoaded(true)
    })
    }, [id])


    return (
        <div>
            {courseStudents.map(courseStudent => {
                return (
                    <NavLink to={`/course/${id}/students/${courseStudent.id}`}>
                        <p>{courseStudent.course_student_info}</p>
                    </NavLink>
                )
            })}
        </div>
    )
}

export default StudentList
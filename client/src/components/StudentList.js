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

    if (!isLoaded) return <h2>Loading...</h2>

    return (
        <div className='min-h-screen bg-slate-200 p-7'>
            <h2 className='text-3xl font-bold mb-4'>Students</h2>
            {courseStudents.map(courseStudent => {
                return (
                    <p className='my-3 ml-2'>
                        <NavLink to={`/course/${id}/students/${courseStudent.id}`} className="hover:text-blue-700">
                            <span className='font-semibold'>{courseStudent.course_student_info}.</span>
                        </NavLink>
                    </p>
                )
            })}
        </div>
    )
}

export default StudentList
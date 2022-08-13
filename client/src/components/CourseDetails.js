import { useParams, NavLink, useHistory } from 'react-router-dom'
import { useState, useEffect } from "react";
import SyllabusForm from './SyllabusForm';

function CourseDetails({  }){

    const [isLoaded, setIsLoaded] = useState(false)
    const [course, setCourse] = useState([])
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        fetch(`/courses/${id}`)
        .then((r) => r.json())
        .then(course => {
        setCourse(course);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    function handleDeleteCourse() {

        fetch(`/courses/${id}`, {
            method:'DELETE'
          })
        history.push(`/professors/${course.professor.id}/courses`);
      }

    return (
        <div>

            <h1>Welcome to {course.title} ({course.code})</h1>

            {course.syllabus ?             
            
                <NavLink to={`/syllabus/${course.syllabus?.id}`}>
                    <p><span>Syllabus</span></p>
                </NavLink> 
            
            : 
                <>
                    <h2>Add a syllabus description</h2> 
                    <SyllabusForm course={course} setCourse={setCourse}/>
                </>}

            <NavLink to={`/course/${id}/assignments`}>
                <p><span>Assignments</span></p>
            </NavLink>

            <NavLink to={`/course/${id}/announcements`}>
                <p><span>Announcements</span></p>
            </NavLink>

            <NavLink to={`/course/${id}/discussion_board`}>
                <p><span>Discussion Board</span></p>
            </NavLink>



            <button onClick={handleDeleteCourse}>Delete</button>

             

        </div>
    )
}

export default CourseDetails
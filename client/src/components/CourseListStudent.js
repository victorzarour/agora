import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../context/user";
import { useEffect, useState } from "react";
import CourseForm from './CourseForm'

function CourseListStudent( ){
        const { user } = useContext(UserContext)
        const [courses, setCourses] = useState([])
        const [isLoaded, setIsLoaded] = useState(false)
        const [show, setShow] = useState(false)
        const [code, setCode] = useState("")
        const { id } = useParams();

        useEffect(() => {
            fetch(`/students/${id}/courses`)
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

        function handleChange(e){
            setCode(e.target.value);
        };

        function handleSubmit(e){
            e.preventDefault();
    
            fetch('/course_students', {
                method: 'POST',
                headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                },
                body: JSON.stringify({code: code, student_id: id}),
            })
            .then(res => res.json())
            .then(newCourse => {
                console.log(newCourse)
                setCourses([...courses, newCourse.course])
                setCode("")
                // history.push(`/courses/${newCourse.course.id}`) 
                })
    
        };

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
                        <span>, {course.days}</span>
                    </p>

                    )} )
             }

            <button onClick={toggleShowForm}>Add a course</button>

            <div className={show ? "show" : "hide"}> 

            <form onSubmit={handleSubmit} autoComplete="off" >
                <div>                        
                    <input type="text" id="code" placeholder="code..." name="code" value={code} onChange={handleChange} />
                </div>

                <button type="submit">Submit</button>
            </form>

            </div>

         </div>
    )
}

export default CourseListStudent
import { NavLink, useParams } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../context/user";
import { CourseContext } from "../context/course";
import { useEffect, useState } from "react";
import CourseForm from './CourseForm'

function CourseList( ){
    const { user } = useContext(UserContext)
    const { currentCourse, setCurrentCourse } = useContext(CourseContext)
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
        <div className='min-h-screen bg-slate-200 text-center pt-20'>

            <h1 className='text-4xl font-bold my-8'>Welcome, {user?.first_name}</h1>

            <h2 className='text-2xl font-bold my-8'>Your courses</h2>

            {courses?.map(course => {
                return (
                    <p className='font-bold my-8'>
                        <NavLink to={`/course/${course.id}`} className="hover:text-blue-700" onClick={(e) => setCurrentCourse(course)}>
                            <span> - {course.title}</span>
                        </NavLink>
                        <span>, {course.university}</span>
                        <span>, {course.days}</span>
                        <span>, {course.code}</span>
                    </p>

                    )} )
             }

            <button onClick={toggleShowForm} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add a course</button>
            
            <div className={show ? "show my-9" : "hide"}> 
                <CourseForm setCourses={setCourses} courses={courses}/>
            </div>

         </div>
    )
}

export default CourseList
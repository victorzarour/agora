import { NavLink, useParams } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../context/user";
import { CourseContext } from "../context/course";
import { useEffect, useState } from "react";
import CourseForm from './CourseForm'

function CourseListStudent( ){
        const { user } = useContext(UserContext)
        const { currentCourse, setCurrentCourse } = useContext(CourseContext)
        const [courses, setCourses] = useState([])
        const [isLoaded, setIsLoaded] = useState(false)
        const [show, setShow] = useState(false)
        const [displayError, setDisplayError] = useState(false)
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
            .then(res => {
                if(res.ok){
                    res.json().then(newCourse => {
                    setCourses([...courses, newCourse.course])
                    setCode("")})
                    setShow(!show)
                } else {
                    setShow(!show)
                    setDisplayError(!displayError)
                }
            })
        };


    return (
        <div className='min-h-screen bg-slate-200 text-center pt-20'>

            <h1 className='text-4xl font-bold my-8'>Welcome, {user?.first_name}</h1>

            <h2 className='text-2xl font-bold my-8'>Your courses</h2>

            {courses?.map(course => {
                return (
                    <p className='font-bold my-8'>
                        <NavLink to={`/course/${course.id}`} className="hover:text-blue-700" onClick={(e) => setCurrentCourse(course)}>
                            <span>{course.title}</span>
                        </NavLink>
                        <span>, {course.university}</span>
                        <span>, {course.days}</span>
                    </p>

                    )} )
             }

            <button onClick={toggleShowForm} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add a course</button>

            <div className={show ? "show my-9 w-1/12 mx-auto" : "hide"}> 

                <form onSubmit={handleSubmit} autoComplete="off" >

                    <div>                        
                        <input type="text" id="code" placeholder="Code" name="code" value={code} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-center"/>
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6">Submit</button>

                </form>

            </div>

            <div className={displayError ? "show mt-4 font-semibold" : "hide"}>
                <p>Please enter a valid course code.</p>
                <button className='mt-4 hover:text-blue-700' onClick={() =>{
                    setShow(!show)
                    setDisplayError(!displayError)}}>Try again.</button>
            </div>

         </div>
    )
}

export default CourseListStudent
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { CourseContext } from "../context/course";
import { useHistory } from "react-router-dom";

function CourseForm( { setCourses, courses } ) {
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);
    const { currentCourse, setCurrentCourse } = useContext(CourseContext)

    const [formData, setFormData] = useState({
        university: "",
        title: "",
        professor_id: user?.id,
        department: "",
        days: "",
        code: Math.floor(Math.random() * 100000)
      });

    function handleChange(e){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleSubmit(e){
        e.preventDefault();

        fetch('/courses', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(newCourse => {
            setCourses([...courses, newCourse])
            history.push(`/course/${newCourse.id}`) 
            console.log(newCourse)
            setCurrentCourse(newCourse)
            })

    };

    return(   
            
        <form onSubmit={handleSubmit} autoComplete="off" className="w-1/4 mx-auto" >
                
                <div className="relative z-0 mb-6 w-full group">                
                    <input type="text" id="university" placeholder="University" name="university" value={formData.university} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
                </div>

                <div className="relative z-0 mb-6 w-full group">                
                    <input type="text" id="title" placeholder="Course Title" name="title" value={formData.title} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
                </div>

                <div className="relative z-0 mb-6 w-full group">                        
                    <input type="text" id="department" placeholder="Department" name="department" value={formData.department} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
                </div>

                <div className="relative z-0 mb-6 w-full group">                        
                    <input type="text" id="days" placeholder="Meeting Days..." name="days" value={formData.days} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
                </div>

                <div className="relative z-0 mb-6 w-full group">                        
                    <input type="text" id="code" placeholder="code..." name="code" value={formData.code} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

    );
}

export default CourseForm;
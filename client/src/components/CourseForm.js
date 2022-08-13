import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";

function CourseForm( { setCourses, courses } ) {
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        university: "",
        title: "",
        professor_id: user.id,
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
            history.push(`/courses/${newCourse.id}`) 
            })

    };

    return(   
            
        <form onSubmit={handleSubmit} autoComplete="off" >
                
                <h2>Add a Course</h2>

                <div>                
                    <input type="text" id="university" placeholder="University" name="university" value={formData.university} onChange={handleChange}/>
                </div>

                <div>                
                    <input type="text" id="title" placeholder="Course Title" name="title" value={formData.title} onChange={handleChange}/>
                </div>

                <div>                        
                    <input type="text" id="department" placeholder="Department" name="department" value={formData.department} onChange={handleChange}/>
                </div>

                <div>                        
                    <input type="text" id="days" placeholder="Meeting Days..." name="days" value={formData.days} onChange={handleChange}/>
                </div>

                <div>                        
                    <input type="text" id="code" placeholder="code..." name="code" value={formData.code} />
                </div>

                <button type="submit">Submit</button>
            </form>

    );
}

export default CourseForm;
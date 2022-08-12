import { useState } from "react";
import { useParams, useHistory } from 'react-router-dom'

function SyllabusForm( { course, setCourse } ) {
    const history = useHistory();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        description: "",
        course_id: id
      });

    function handleChange(e){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleSubmit(e){
        e.preventDefault();
        console.log(formData)
        fetch('/syllabuses', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(syllabus => {
            setCourse({title: course.title, syllabus: syllabus})
            history.push(`/syllabus/${syllabus.id}`);
        })
    };

    return(   
            
        <form onSubmit={handleSubmit} autoComplete="off" >
                
                 <div>                
                    <textarea type="text" id="description" placeholder="description" name="description" value={formData.description} onChange={handleChange}/>
                </div>

                <button type="submit">Submit</button>
            </form>

    );
}

export default SyllabusForm;
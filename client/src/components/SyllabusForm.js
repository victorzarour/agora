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
                
                <textarea type="textarea" id="description" placeholder="Description" name="description" value={formData.description} onChange={handleChange} rows="4" className="mt-4 w-4/5 block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-8" type="submit">Submit</button>

        </form>

    );
}

export default SyllabusForm;
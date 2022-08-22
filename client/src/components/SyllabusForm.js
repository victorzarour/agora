import { useState } from "react";
import { useParams, useHistory } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function SyllabusForm( { course, setCourse } ) {
    const history = useHistory();
    const { id } = useParams();
    const [text, setText] = useState("")

    function handleSubmit(e){
        e.preventDefault();
        fetch('/syllabuses', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify({
                description: text,
                course_id: id
            }),
        })
        .then(res => res.json())
        .then(syllabus => {
            setCourse({title: course.title, syllabus: syllabus})
            history.push(`/syllabus/${syllabus.id}`);
        })
    };

    return(   
            
        <form onSubmit={handleSubmit} autoComplete="off" >
                
                <div className="w-3/4">
                    <CKEditor 
                        editor={ClassicEditor}
                        data={text}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setText(data)
                        }}
                    /> 
                </div>

                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-8" type="submit">Submit</button>

        </form>

    );
}

export default SyllabusForm;
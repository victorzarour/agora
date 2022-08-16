import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user";

function Assignment(){
    const [isLoaded, setIsLoaded] = useState(false)
    const [assignment, setAssignment] = useState([])
    const [submissions, setSubmissions] = useState([])
    const [show, setShow] = useState(false)
    const history = useHistory();
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [formDataPatch, setFormDataPatch] = useState([]);
    const [submission, setSubmission] = useState([])

    useEffect(() => {
        fetch(`/assignments/${id}`)
        .then((r) => r.json())
        .then(assignment => {
        setAssignment(assignment);
        setIsLoaded(true)
        setFormDataPatch({
            due_date: assignment.due_date,
            title: assignment.title,
            description: assignment.description
        })
    })
    }, [id])

    useEffect(() => {
        fetch(`/assignments/${id}/submissions`)
        .then((r) => r.json())
        .then(submissions => {
        setSubmissions(submissions);
        setIsLoaded(true)
    })
    }, [])

    if (!isLoaded) return <h2>Loading...</h2>

    function handleChange(e){
        const { name, value } = e.target;
        setFormDataPatch({ ...formDataPatch, [name]: value });
    };

    function toggleEdit(){
        setShow(!show)
    }

    function handleDeleteAssignment(){
        fetch(`/assignments/${id}`, {
            method:'DELETE'
          })
        history.push(`/course/${assignment.course.id}/assignments`);
    }

    function handlePatch(e) {
        e.preventDefault()
        fetch(`/assignments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataPatch),
        })
        .then(res => res.json())
        .then(updatedAssignment => setAssignment(updatedAssignment))
        setShow(!show)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('submission[student_id]', user?.id)
        formData.append('submission[assignment_id]', id)
        formData.append('submission[file]',
                         e.target.file.files[0])
        fetch('/submissions', {
           method: "POST",
           body: formData
        })
        .then(r => r.json())
        .then(submission => setSubmissions([...submissions, submission]))
        .catch((error) => console.error(error))
     }

     const destructuredIds = submissions.map(submission => submission.student_id)

    return (
        <>
            <div>
                <p>{assignment.title}</p>
                <p>{assignment.due_date}</p>
                <p>{assignment.description}</p>
            </div>

            {user?.admin ?
                <>
                    <button onClick={toggleEdit}>Edit Assignment</button>
                    <button onClick={handleDeleteAssignment}>Delete Assignment</button>

                    <form onSubmit={handlePatch} className={show ? "show" : "hide"}>
                        <input type="date" id="due_date" placeholder="due_date" name="due_date" value={formDataPatch.due_date} onChange={handleChange}></input>
                        <input type="text" id="title" placeholder="title..." name="title" value={formDataPatch.title} onChange={handleChange}></input>
                        <input type="textarea" id="description" placeholder="description..." name="description" value={formDataPatch.description} onChange={handleChange}></input>
                        <button type='submit'>Submit</button>
                    </form>

                    <div>
                        {submissions.map(submission => {
                            return (
                                <div>
                                    <span>{submission.student_name} - </span><a download href={submission.file_url}>{submission.file_name}</a>
                                </div>
                                )
                            })}
                    </div>

                </>
            :
 
                destructuredIds.indexOf(user?.id) !== -1 ? 
                    <>
                    <p>Thank you for submitting!</p>
                    <div>
                    {submissions.map(submission => submission.student_id === user?.id ? 
                        <a download href={submission.file_url}>{submission.file_name}</a>
                        :
                        null
                    )}
                    </div>
                    </>
                :
                <>
                <p>Submit your assignment here:</p>
                <form onSubmit={handleSubmit}>
                    <input type="file" id="file" name="file"/>
                    <button type='submit'>Submit</button>
                </form>  
                </>          
                
            }






        </>
    )
}

export default Assignment
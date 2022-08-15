import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user";

function Assignment(){
    const [isLoaded, setIsLoaded] = useState(false)
    const [assignment, setAssignment] = useState([])
    const [show, setShow] = useState(false)
    const history = useHistory();
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        fetch(`/assignments/${id}`)
        .then((r) => r.json())
        .then(assignment => {
        setAssignment(assignment);
        setIsLoaded(true)
        setFormData({
            due_date: assignment.due_date,
            title: assignment.title,
            description: assignment.description
        })
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    function handleChange(e){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(updatedAssignment => setAssignment(updatedAssignment))
        setShow(!show)
    }


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
                        <input type="date" id="due_date" placeholder="due_date" name="due_date" value={formData.due_date} onChange={handleChange}></input>
                        <input type="text" id="title" placeholder="title..." name="title" value={formData.title} onChange={handleChange}></input>
                        <input type="textarea" id="description" placeholder="description..." name="description" value={formData.description} onChange={handleChange}></input>
                        <button type='submit'>Submit</button>
                    </form>
                </>
            :
                null
            }

            

        </>
    )
}

export default Assignment
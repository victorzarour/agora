import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from "react";

function AssignmentList( ){
    const [isLoaded, setIsLoaded] = useState(false)
    const [assignments, setAssignments] = useState([])
    const { id } = useParams();

    const [formData, setFormData] = useState({
        due_date: "",
        title: "",
        description: "",
        course_id: id
      });
    

    useEffect(() => {
        fetch(`/courses/${id}/assignments`)
        .then((r) => r.json())
        .then(assignments => {
        setAssignments(assignments);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    function handleChange(e){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleSubmit(e){
        e.preventDefault();
        fetch('/assignments', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((resp) => resp.json())
        .then((assignment) => {setAssignments([...assignments, assignment]);
        setFormData({
            due_date: "",
            title: "",
            description: "",
            course_id: id
        });
        });
    };


    return (
        <div>
            <h1>Assignments</h1>
                {assignments.map(assignment => {
                    return (
                        <NavLink to={`/assignments/${assignment.id}`}>
                            <p><span>{assignment.title}</span></p>
                        </NavLink>
                    )
                })}
                
    

            <h2>Add an assignment</h2>
            <form onSubmit={handleSubmit}>
                <input type="date" id="due_date" placeholder="due_date" name="due_date" value={formData.due_date} onChange={handleChange}></input>
                <input type="text" id="title" placeholder="title..." name="title" value={formData.title} onChange={handleChange}></input>
                <input type="textarea" id="description" placeholder="description..." name="description" value={formData.description} onChange={handleChange}></input>
                <button type='submit'>Submit</button>
            </form>

         </div>
    )
}

export default AssignmentList
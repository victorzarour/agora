import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from "react";

function Assignment( ){
    const [isLoaded, setIsLoaded] = useState(false)
    const [assignment, setAssignment] = useState([])
    const { id } = useParams();

    // const [formData, setFormData] = useState({
    //     due_date: "",
    //     title: "",
    //     description: "",
    //     course_id: id
    //   });
    

    useEffect(() => {
        fetch(`/assignments/${id}`)
        .then((r) => r.json())
        .then(assignment => {
        setAssignment(assignment);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    // function handleChange(e){
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // function handleSubmit(e){
    //     e.preventDefault();
    //     fetch('/assignments', {
    //         method: "POST",
    //         headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json",
    //         },
    //         body: JSON.stringify(formData),
    //     })
    //     .then((resp) => resp.json())
    //     .then((assignment) => {setAssignments([...assignments, assignment]);
    //     setFormData({
    //         due_date: "",
    //         title: "",
    //         description: "",
    //         course_id: id
    //     });
    //     });
    // };


    return (
        <div>
            {assignment.title}
            {assignment.due_date}
            {assignment.description}
         </div>
    )
}

export default Assignment
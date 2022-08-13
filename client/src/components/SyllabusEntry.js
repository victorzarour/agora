import { useEffect, useState } from "react";

function SyllabusEntry( { entry, onDeleteEntry, onUpdateEntry } ){
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({
        date: entry.date,
        assignment: entry.assignment
      });
    
    function handleChange(e){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleDeleteEntry(e){
        fetch(`/syllabus_entries/${entry.id}`, {
            method:'DELETE'
          })
          onDeleteEntry(entry)
    }

    function toggleShowForm(){
        setShow(!show)
    }
    
    function handlePatch(e) {
        e.preventDefault()
        fetch(`/syllabus_entries/${entry.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(updatedEntry => onUpdateEntry(updatedEntry))
        setShow(!show)
    }


    return (
        <p>
            {entry.date} -- {entry.assignment}   
            <i className="fa-solid fa-xmark" onClick={handleDeleteEntry}></i>
            <i class="fa-solid fa-pen-to-square" onClick={toggleShowForm}></i>
            <form className={show ? "show" : "hide"} onSubmit={handlePatch}>
                <input type="date" id="date" placeholder="date..." name="date" value={formData.date} onChange={handleChange}></input>
                <input type="text" id="assignment" placeholder="assignment..." name="assignment" value={formData.assignment} onChange={handleChange}></input>
                <button type='submit'>Submit</button>
            </form>
         </p>
    )
}

export default SyllabusEntry
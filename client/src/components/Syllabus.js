import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import SyllabusEntry from './SyllabusEntry';

function Syllabus( ){
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false)
    const [syllabus, setSyllabus] = useState([])
    const [entries, setEntries] = useState([])

    const [formData, setFormData] = useState({
        date: "",
        assignment: "",
        syllabus_id: id
      });

    useEffect(() => {
        fetch(`/syllabuses/${id}`)
        .then((r) => r.json())
        .then(syllabus => {
        setSyllabus(syllabus);
        setIsLoaded(true)
    })
    }, [id])

    useEffect(() => {
        fetch(`/syllabuses/${id}/syllabus_entries`)
        .then((r) => r.json())
        .then(entries => {
        setEntries(entries);
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
        fetch('/syllabus_entries', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((resp) => resp.json())
        .then((entry) => {setEntries([...entries, entry]);
        setFormData({
            date: "",
            assignment: "",
            syllabus_id: id
        });
        });
    };

    function onDeleteEntry(deletedEntry){
        const filteredEntries = entries.filter(entry => entry.id !== deletedEntry.id)
        setEntries(filteredEntries)
    }

    function onUpdateEntry(updatedEntry){
        console.log("fag")
        const updatedEntries = entries.map(entry => {
            if (entry.id === updatedEntry.id){
                return updatedEntry
            } else {
                return entry
            }
        })
        setEntries(updatedEntries)
    }

    return (
        <div>
            <h1>{syllabus.course?.title}</h1>

            {syllabus.description}
            {entries.map(entry => {
                return (
                    <SyllabusEntry entry={entry} onDeleteEntry={onDeleteEntry} onUpdateEntry={onUpdateEntry}/>
                )
            })}

            <form onSubmit={handleSubmit}>
                <input type="date" id="date" placeholder="date..." name="date" value={formData.date} onChange={handleChange}></input>
                <input type="text" id="assignment" placeholder="assignment..." name="assignment" value={formData.assignment} onChange={handleChange}></input>
                <button type='submit'>Submit</button>
            </form>

         </div>
    )
}

export default Syllabus
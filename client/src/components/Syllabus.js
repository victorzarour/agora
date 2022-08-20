import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user";
import SyllabusEntry from './SyllabusEntry';

function Syllabus( ){
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false)
    const [syllabus, setSyllabus] = useState([])
    const [entries, setEntries] = useState([])
    const { user } = useContext(UserContext);

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
            date: entry.date,
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
        <div className='min-h-screen bg-slate-200 p-7'>
            <h1 className='text-4xl font-bold my-8'>{syllabus.course?.title}</h1>

            <p className='text-justify my-8'>{syllabus.description}</p>

            {entries.map(entry => {
                return (
                    <SyllabusEntry entry={entry} onDeleteEntry={onDeleteEntry} onUpdateEntry={onUpdateEntry}/>
                )
            })}

            {user?.admin ?

                <form onSubmit={handleSubmit} className="w-1/4 mt-10">
                    <input type="date" id="date" placeholder="date..." name="date" value={formData.date} onChange={handleChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></input>
                    <input type="text" id="assignment" placeholder="Assignment" name="assignment" value={formData.assignment} onChange={handleChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></input>
                    <button type='submit' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Submit</button>
     
                </form>

            :

                null

            }


         </div>
    )
}

export default Syllabus
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user";

function Announcement(){
    const [isLoaded, setIsLoaded] = useState(false)
    const [announcement, setAnnouncement] = useState([])
    const [show, setShow] = useState(false)
    const history = useHistory();
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        fetch(`/announcements/${id}`)
        .then((r) => r.json())
        .then(announcement => {
        setAnnouncement(announcement);
        setIsLoaded(true)
        setFormData({
            title: announcement.title,
            body: announcement.body
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

    function handleDeleteAnnouncement(){
        fetch(`/announcements/${id}`, {
            method:'DELETE'
          })
        history.push(`/course/${announcement.course.id}/announcements`);
    }

    function handlePatch(e) {
        e.preventDefault()
        fetch(`/announcements/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(updatedAnnouncement => setAnnouncement(updatedAnnouncement))
        setShow(!show)
    }


    return (
        <>
            <div>
                <p>{announcement.title}</p>
                <p>{announcement.created_at.slice(0, 10)}</p>
                <p>{announcement.body}</p>
            </div>

            {user?.admin ?
                <>
                <button onClick={toggleEdit}>Edit Announcement</button>
                <button onClick={handleDeleteAnnouncement}>Delete Announcement</button>
    
                <form onSubmit={handlePatch} className={show ? "show" : "hide"}>
                    <input type="text" id="title" placeholder="title..." name="title" value={formData.title} onChange={handleChange}></input>
                    <input type="textarea" id="body" placeholder="body..." name="body" value={formData.body} onChange={handleChange}></input>
                    <button type='submit'>Submit</button>
                </form>
                </>
            :
                null
            }

        </>
    )
}

export default Announcement
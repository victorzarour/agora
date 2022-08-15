import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user";

function AnnouncementList( ){
    const [isLoaded, setIsLoaded] = useState(false)
    const [announcements, setAnnouncements] = useState([])
    const { id } = useParams();
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({
        title: "",
        body: "",
        course_id: id
      });
    

    useEffect(() => {
        fetch(`/courses/${id}/announcements`)
        .then((r) => r.json())
        .then(announcements => {
        setAnnouncements(announcements);
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
        fetch('/announcements', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((resp) => resp.json())
        .then((announcement) => {setAnnouncements([...announcements, announcement]);
        setFormData({
            title: "",
            body: "",
            course_id: id
        });
        });
    };


    return (
        <div>
            <h1>Announcements</h1>
                {announcements?.map(announcement => {
                    return (
                        <p>
                            <NavLink to={`/announcements/${announcement.id}`}>
                                <span>{announcement.title}</span>
                            </NavLink>
                            <span> - {announcement.created_at.slice(0, 10)}</span>
                        </p>

                    )
                })}
                
    
            {user?.admin ?
                <>
                    <h2>Add an announcement</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" id="title" placeholder="title..." name="title" value={formData.title} onChange={handleChange}></input>
                        <input type="textarea" id="body" placeholder="body..." name="body" value={formData.body} onChange={handleChange}></input>
                        <button type='submit'>Submit</button>
                    </form>
                </>
            :
                null
            }


         </div>
    )
}

export default AnnouncementList
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from "react";
import DiscussionPost from './DiscussionPost';
import DiscussionPostList from './DiscussionPostList';

function Discussion(){
    const [isLoaded, setIsLoaded] = useState(false)
    const [discussion, setDiscussion] = useState([])
    const [show, setShow] = useState(false)
    const history = useHistory();
    const { id } = useParams();
    const [formData, setFormData] = useState([]);


    useEffect(() => {
        fetch(`/discussions/${id}`)
        .then((r) => r.json())
        .then(discussion => {
        setDiscussion(discussion);
        setIsLoaded(true)
        setFormData({
            title: discussion.title,
            body: discussion.body
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

    function handleDeletediscussion(){
        fetch(`/discussions/${id}`, {
            method:'DELETE'
          })
        history.push(`/course/${discussion.course.id}/discussion_board`);
    }

    function handlePatch(e) {
        e.preventDefault()
        fetch(`/discussions/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(updatedDiscussion => setDiscussion(updatedDiscussion))
        setShow(!show)
    }

    return (
        <>
            <div>
                <p>{discussion.title}</p>
                <p>{discussion.created_at.slice(0, 10)}</p>
                <p>{discussion.body}</p>
            </div>

            
            <button onClick={toggleEdit}>Edit discussion</button>
            <button onClick={handleDeletediscussion}>Delete discussion</button>

            <form onSubmit={handlePatch} className={show ? "show" : "hide"}>
                <input type="text" id="title" placeholder="title..." name="title" value={formData.title} onChange={handleChange}></input>
                <input type="textarea" id="body" placeholder="body..." name="body" value={formData.body} onChange={handleChange}></input>
                <button type='submit'>Submit</button>
            </form>

            <DiscussionPostList discussionId={id}/>

        </>
    )
}

export default Discussion
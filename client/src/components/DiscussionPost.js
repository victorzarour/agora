import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user";

function DiscussionPost({ discussionPost, onDeletePost, onUpdatePost }) {
    const [show, setShow] = useState(false)
    const { user } = useContext(UserContext);
    const { id, created_at, body, student } = discussionPost 
    const [updatedBody, setUpdatedBody] = useState(body)

    function handleDeletePost(){
        onDeletePost(discussionPost)
        fetch(`/discussion_posts/${id}`, {
            method:'DELETE'
          })
    }

    function handleUpdatePost(e) {
        e.preventDefault();
        fetch(`/discussion_posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({body: updatedBody}),
        })
        .then(res => res.json())
        .then(updatedDiscussionPost => onUpdatePost(updatedDiscussionPost))
        setShow(!show)
    }

    function handlePostChange(e){
        setUpdatedBody(e.target.value)
    }

    function toggleShowForm(){
        setShow(!show)
    }

    return (
        <div>
            <p>{created_at}</p>
            <p>By: {student?.first_name} {student?.last_name}</p>
            <p>{body}</p>

            {user?.id === student.id ?
                <>
                <button onClick={handleDeletePost}>Delete</button>
                <button onClick={toggleShowForm}>Edit</button>

                <form className={show ? "show" : "hide"} onSubmit={handleUpdatePost}>
                    <input type="textarea" id="body" placeholder="body..." name="body" value={updatedBody} onChange={handlePostChange}></input>
                    <button type='submit'>Submit</button>
                </form>              
                </>
            :
                null
            }

        </div>
    )
}

export default DiscussionPost
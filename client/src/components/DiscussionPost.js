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
        <div className="my-7 bg-red-200 p-3">
            <p className='text-sl'><span className="font-bold">{student?.first_name} {student?.last_name}, </span><span>posted on {created_at.slice(0, 10)}</span></p>
            <p className="p-3">{body}</p>

            {user?.id === student.id ?
                <>
                <div class="inline-flex">
                    <button onClick={handleDeletePost} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold text-sm py-1 px-3 rounded-l">Delete</button>
                    <button onClick={toggleShowForm} class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold text-sm py-1 px-3 rounded-r">Edit</button>
                </div>

                <form className={show ? "show" : "hide"} onSubmit={handleUpdatePost}>

                    <textarea type="textarea" id="body" placeholder="Body" name="body" value={updatedBody} onChange={handlePostChange} rows="4" className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

                    <button type='submit' class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold text-sm py-1 px-3 rounded-r mt-4">Submit</button>
                
                </form>              
                </>
            :
                null
            }

        </div>
    )
}

export default DiscussionPost
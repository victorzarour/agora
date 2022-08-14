import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user";
import DiscussionPost from "./DiscussionPost";

function DiscussionPostList( { discussionId }) {
    const [discussionPosts, setDiscussionPosts] = useState([])
    const { user } = useContext(UserContext)
    const [postData, setPostData] = useState({
        discussion_id: discussionId,
        student_id: user?.id,
        body: ""
    });

    useEffect(() => {
        fetch(`/discussions/${discussionId}/discussion_posts`)
        .then((r) => r.json())
        .then(discussionPosts => {
        setDiscussionPosts(discussionPosts);
    })
    }, [discussionId])

    function handlePostChange(e){
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    }

    function handleSubmit(e){
        e.preventDefault();
        fetch('/discussion_posts', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(postData),
        })
        .then((resp) => resp.json())
        .then((discussionPost) => {setDiscussionPosts([...discussionPosts, discussionPost]);
        setPostData({
            discussion_id: discussionId,
            student_id: discussionPost.student?.id,
            body: ""
        });
        });
    };

    function onDeletePost(deletedDiscussionPost){  
        const filteredDiscussionPosts = discussionPosts.filter(discussionPost => discussionPost.id !== deletedDiscussionPost.id)
        setDiscussionPosts(filteredDiscussionPosts)
    }

    function onUpdatePost(updatedDiscussionPost){  
        const updatedDiscussionPosts = discussionPosts.map(discussionPost => {
            if (discussionPost.id === updatedDiscussionPost.id){
                return updatedDiscussionPost
            } else {
                return discussionPost
            }
        })
        setDiscussionPosts(updatedDiscussionPosts)
    }


    return (
        <div>
            <h3>Post your blog below!</h3>

            <form onSubmit={handleSubmit}>
                <input type="textarea" id="body" placeholder="body..." name="body" value={postData.body} onChange={handlePostChange}></input>
                <button type='submit'>Submit</button>
            </form>
            
            {discussionPosts.map(discussionPost => <DiscussionPost discussionPost={discussionPost} onDeletePost={onDeletePost} onUpdatePost={onUpdatePost}/>)}
        </div>
    )
}

export default DiscussionPostList
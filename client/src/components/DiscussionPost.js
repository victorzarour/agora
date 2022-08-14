function DiscussionPost({ discussionPost }) {

    const { created_at, body, student } = discussionPost 

    return (
        <div>
            <p>{created_at}</p>
            <p>By: {student?.first_name} {student?.last_name}</p>
            <p>{body}</p>

        </div>
    )
}

export default DiscussionPost
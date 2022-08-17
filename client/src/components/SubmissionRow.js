import { useState, useEffect } from "react";

function SubmissionRow({ submission }) {
    const [letterGrade, setLetterGrade] = useState("")
    const { id, file_url, file_name, student_id, assignment, grade } = submission

    function handleChange(e){
        setLetterGrade(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault();
        fetch('/grades', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify({
                letter_grade: letterGrade,
                submission_id: id
            }),
        })
        // .then((resp) => resp.json())
        // .then((announcement) => {setAnnouncements([...announcements, announcement]);
        // });
    };

    return (
        <form onSubmit={handleSubmit}>
            <tr>
                <td>{assignment.title}</td>
                <td><a download href={file_url}>{file_name}</a></td>
                {grade ? grade.letter_grade :
                <div>
                    <input type="text" id="letter_grade" placeholder="letter_grade..." name="letter_grade" value={letterGrade} onChange={handleChange}></input> 
                    <button type='submit'>Submit Grade</button>
                </div>}
            </tr>
        </form>
    )
}

export default SubmissionRow
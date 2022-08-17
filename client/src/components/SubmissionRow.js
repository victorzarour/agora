import { useState, useEffect } from "react";

function SubmissionRow({ submission }) {
    const [grade, setGrade] = useState("")
    const [show, setShow] = useState(false)
    const [letterGrade, setLetterGrade] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const { id, file_url, file_name, student_id, assignment } = submission

    useEffect(() => {
        fetch(`/grades/submission/${id}`)
        .then((r) => r.json())
        .then(grade => {
        setGrade(grade);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

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
        .then((resp) => resp.json())
        .then(grade => setGrade(grade));
    };

    function handleDeleteGrade(){
         fetch(`/grades/submission/${id}`, {
            method:'DELETE'
          })
        setGrade("")
    }

    function toggleShowForm(){
        setShow(!show)
    }

    return (
        <form onSubmit={handleSubmit}>
            <tr>
                <td>{assignment.title}</td>
                <td><a download href={file_url}>{file_name}</a></td>
                {grade ? 
                    <>
                    <div>
                        <span>{grade.letter_grade}</span>
                        <i className="fa-solid fa-xmark" onClick={handleDeleteGrade}></i>
                    </div>
                    </>

                 :
                    <div>
                        <input type="text" id="letter_grade" placeholder="letter_grade..." name="letter_grade" value={letterGrade} onChange={handleChange}></input> 
                        <button type='submit'>Submit Grade</button>
                    </div>}
            </tr>
        </form>
    )
}

export default SubmissionRow
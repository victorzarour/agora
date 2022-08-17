import { useParams, NavLink, useHistory } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../context/user";
import { useState, useEffect } from "react";
import SubmissionRow from './SubmissionRow';

function StudentGrades(){

    const [isLoaded, setIsLoaded] = useState(false)
    const [submissions, setSubmissions] = useState([])
    const [course, setCourse] = useState("")
    const { id } = useParams();
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`/submissions/${user?.id}/grades`)
        .then((r) => r.json())
        .then(submissions => {
        setSubmissions(submissions);
        setIsLoaded(true)
    })
    }, [])

    useEffect(() => {
        fetch(`/courses/${id}`)
        .then((r) => r.json())
        .then(course => {
        setCourse(course);
        setIsLoaded(true)
    })
    }, [])

    if (!isLoaded) return <h2>Loading...</h2>

    const filteredSubmissions = submissions.filter(submission => submission.assignment.course_id === course.id) 
  

  console.log(filteredSubmissions)

    return (
        <div>
            <h1>Grades</h1>
            <table>
                <tr>
                    <th>Assignment</th>
                    <th>Submission</th>
                    <th>Grade</th>
                </tr>
            </table>
            <div>
                {filteredSubmissions.map(submission => {
                    return (
                        <p>{submission.assignment.title} - {submission.grade.letter_grade}</p>
                    )
                })}
            </div>
        </div>
    )
}

export default StudentGrades
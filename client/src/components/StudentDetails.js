import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import SubmissionRow from './SubmissionRow';

function StudentDetails() {
    const [student, setStudent] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        fetch(`/course_students/${id}`)
        .then((r) => r.json())
        .then(student => {
        setStudent(student);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    const { course, course_student_info, submissions } = student

    return (
        <div>
            <h1>{course_student_info}</h1>
            <h2>{course.title}</h2>
            <table>
                <tr>
                    <th>Assignment</th>
                    <th>Submission</th>
                    <th>Grade</th>
                </tr>
            </table>
            {submissions.map(submission => <SubmissionRow submission={submission} />)}
        </div>

    )
}

export default StudentDetails
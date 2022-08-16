import { useParams } from 'react-router-dom'

function StudentDetails() {
    
    const { id } = useParams();

    console.log(id)

    return (
        <div>
            HEY BABY
        </div>

    )
}

export default StudentDetails
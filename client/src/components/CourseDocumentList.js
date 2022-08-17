import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from "react";
import CourseDocument from './CourseDocument';

function CourseDocumentList (){

    const [documents, setDocuments] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        fetch(`/courses/${id}/course_documents`)
        .then((r) => r.json())
        .then(documents => {
        setDocuments(documents);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('course_document[course_id]', id)
        formData.append('course_document[document_file]',
                         e.target.file.files[0])
        fetch('/course_documents', {
           method: "POST",
           body: formData
        })
        .then(r => r.json())
        .then(document => setDocuments([...documents, document]))
        .catch((error) => console.error(error))
     }

     function onDeleteDocument(deletedDocument){
        const filteredDocuments = documents.filter(document => document.id !== deletedDocument.id)
        setDocuments(filteredDocuments)
    }


    return (
        <div>
            <div>
                {documents.map(document => <CourseDocument document={document} onDeleteDocument={onDeleteDocument}/>)}
            </div>

            <form onSubmit={handleSubmit}>
                <input type="file" id="file" name="file"/>
                <button type='submit'>Submit</button>
            </form>  
        </div>
    )
}

export default CourseDocumentList
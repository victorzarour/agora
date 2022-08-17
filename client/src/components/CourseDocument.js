function CourseDocument ({ document, onDeleteDocument }){

    function handleDeleteDocument(e){
        fetch(`/course_documents/${document.id}`, {
            method:'DELETE'
          })
          onDeleteDocument(document)
    }

    return (
        <div>
            <a download href={document.document_file_url}>{document.document_file_name}</a>
            <i className="fa-solid fa-xmark" onClick={handleDeleteDocument}></i>
        </div>
    )
}

export default CourseDocument
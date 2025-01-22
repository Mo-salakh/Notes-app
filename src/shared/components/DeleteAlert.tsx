import { Alert, AlertTitle, Box, Button } from "@mui/material"
import { useNotesContext } from "../../app/provider/store/NotesContext"
import { useEffect, useRef } from "react"

export function DeleteAlert() {

    const {showDeleteAlert, setShowDeleteAlert, deleteNote, toDeleteItemId} = useNotesContext()
    const alertRef = useRef<HTMLDivElement | null>(null)

    function handleDelete() {
        deleteNote(toDeleteItemId)
        setShowDeleteAlert(false)
    }

    useEffect(() => {
        if(alertRef.current) {
            alertRef.current.focus()
        }
    }, [alertRef])


    return (
        <>
        {
            showDeleteAlert &&
            <div className="alert" ref={alertRef}>
                <Alert severity="warning">
                <AlertTitle>Осторожно!</AlertTitle>
                    Вы точно хотите удалить эту заметку?
                    <Box sx={{mt: 1}}>
                        <Button sx={{mr: 1}} variant='outlined' color='error' onClick={handleDelete}>Удалить</Button>
                        <Button variant='outlined' color='success' onClick={() => setShowDeleteAlert(false)}>Оставить</Button>
                    </Box>
                </Alert>
            </div> 
        } 

        </>     
    )
}
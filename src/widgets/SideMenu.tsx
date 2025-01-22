import {
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { useAuthContext } from '../app/provider/store/AuthContext';
import { useNotesContext } from '../app/provider/store/NotesContext';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

export function SideMenu() {
    const { menuOpen, setMenuOpen } = useAuthContext();
    const { notes, createNote, activeNote, setActiveNoteId, setShowDeleteAlert, setToDeleteItemId } = useNotesContext();
    

    return (
        <>
            <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
            <List sx={{ width: '250px' }}>
                <ListItem>
                    <ListItemText primary="Заметки" />
                    <Button size="small" onClick={createNote}>
                        <ListItemIcon>
                            <AddIcon sx={{ width: '30px' }} />
                        </ListItemIcon>
                    </Button>
                </ListItem>
                <Divider />
            </List>

            <List>
                {notes.length < 1 ? (
                    <ListItem>
                        <ListItemText primary="Список заметок пуст..." />
                    </ListItem>
                ) : (
                    notes.map((note) => (
                        <ListItem
                            key={note.id}
                            sx={activeNote?.id === note.id ? { border: '1px solid #c4c4c4' } : undefined}
                            onClick={() => setActiveNoteId(note.id)}
                        >
                            <ListItemText
                                primary={note.title || 'Без названия'}
                                secondary={
                                    note.body.length > 30
                                        ? `${note.body.slice(0, 30)}...`
                                        : note.body
                                }
                            />
                            <ListItemIcon>
                                <IconButton onClick={(e) => {
                                    e.stopPropagation();
                                    setToDeleteItemId(note.id);
                                    setShowDeleteAlert(true)
                                }}>
                                    <CloseIcon fontSize='small' />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>
                    ))
                )}
            </List>
            </Drawer>  
        </>
    );
}

import { Container, TextField } from '@mui/material';
import { useNotesContext } from '../../app/provider/store/NotesContext';

export function Note() {
    const { activeNote, updateNote } = useNotesContext();

    if (!activeNote) {
        return <p>Выберите или создайте заметку.</p>;
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        type: 'title' | 'body'
    ) => {
        updateNote(activeNote.id, { [type]: e.target.value });
    };

    return (
        <Container sx={{ mt: '100px' }}>
            <form
                className="note_form"
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
                <TextField
                    label="Заголовок"
                    variant="outlined"
                    value={activeNote.title}
                    onChange={(e) => handleChange(e, 'title')}
                    fullWidth
                />
                <TextField
                    label="Содержание"
                    variant="outlined"
                    value={activeNote.body}
                    onChange={(e) => handleChange(e, 'body')}
                    multiline
                    rows={10}
                    fullWidth
                />
            </form>
        </Container>
    );
}

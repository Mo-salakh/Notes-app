import { useState } from 'react';
import { useNotesContext } from '../../app/provider/store/NotesContext';
import { Autocomplete, IconButton, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export function SearchNote() {
    const [searchActive, setSearchActive] = useState(false);
    const { notes, setActiveNoteId } = useNotesContext();

    return (
        <>
            <IconButton
                onClick={() => setSearchActive(!searchActive)}
                size="large"
                aria-label="search"
                color="inherit"
            >
                <SearchIcon />
            </IconButton>
            {searchActive && (
                <>
                    <Stack
                        spacing={2}
                        sx={{ width: 300, border: 'none' }}
                    >
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={notes}
                            getOptionLabel={(option) => {
                                return typeof option === 'string' ? option : option.title;
                            }}
                            renderOption={(props, note) => (
                                <li
                                    {...props}
                                    key={note.id}
                                    onClick={() => setActiveNoteId(note.id)}
                                >
                                    {note.title}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                border: 'none',
                                                color: '#fc1c',
                                            },
                                            input: {
                                                color: '#FFFF',
                                                fontSize: '1.2rem',
                                            },
                                        },
                                    }}
                                />
                            )}
                        />
                    </Stack>
                </>
            )}
        </>
    );
}

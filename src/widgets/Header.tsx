import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';
import { useAuthContext } from '../app/provider/store/AuthContext';
import { SearchNote } from '../shared/components/SearchNote';

export function Header() {
    const { setMenuOpen } = useAuthContext();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        onClick={() => setMenuOpen(true)}
                    >
                        <NotesIcon />
                    </IconButton>
                    <Typography sx={{ flexGrow: 1 }}>Notes</Typography>
                    <SearchNote />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

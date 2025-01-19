import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import NotesIcon from '@mui/icons-material/Notes';
import SearchIcon from '@mui/icons-material/Search';
import { useAuthContext } from "../app/provider/store/AuthContext";
import { AuthStatus } from "./AuthStatus";

export function Header() {

    const { setMenuOpen } = useAuthContext()

    return(
        <Box sx={{flexGrow: 1}}>
            <AppBar>
                <Toolbar>
                    <IconButton color="inherit" onClick={() => setMenuOpen(true)}>
                        <NotesIcon />
                    </IconButton>
                    <Typography sx={{flexGrow: 1}}>
                        Notes
                    </Typography>
                    <IconButton size="large" aria-label="search" color="inherit">
                        <SearchIcon />
                    </IconButton>
                    <AuthStatus />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
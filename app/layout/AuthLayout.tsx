import { Box, Container, Typography } from "@mui/material";
import { Login } from "../../pages/login/login";
import { Link } from "react-router-dom";

export function AuthLayout() {
    return (
        <>
            <Container sx={{mt:"30px"}}>
                <Login />
                <Box>
                    <Typography variant="body2" sx={{textAlign:"center", mt:"20px"}}>Вы не зарегистрированы?</Typography>
                    <Typography variant="body1" sx={{textAlign:"center"}}>
                        <Link to={'/reg'}>
                            Зарегистрируйтесь!
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </>
    )
}
import { Button, TextField, Container } from "@mui/material";
import { useAuthContext } from "../../app/provider/store/AuthContext";
import { useNavigate } from "react-router-dom";

export function Registration() {

    const { handleSubmit, isValid } = useAuthContext()
    const navigate = useNavigate()

    const successNav = () => {
        navigate('/')
    }

    return (
        <>
            <Container sx={{ mt: '30px' }}>
                <form
                    onSubmit={(e) => handleSubmit(e, 'registration', successNav)}
                    className="form"
                >
                    <TextField
                        id="outlined-basic"
                        type="text"
                        name="nickname"
                        label="Name"
                        variant="outlined"
                        sx={isValid.nameValid === false ? {
                            '& .MuiInputLabel-root': {
                                color: '#ba000d',
                            }
                        } : null}
                    />
                    <TextField
                        id="outlined-basic"
                        type="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        sx={isValid.emailValid === false ? {
                            '& .MuiInputLabel-root': {
                                color: '#ba000d',
                            }
                        } : null}
                    />
                    <TextField
                        id="outlined-basic"
                        type="password"
                        name="password"
                        label="password"
                        variant="outlined"
                        sx={isValid.passwordValid === false ? {
                            '& .MuiInputLabel-root': {
                                color: '#ba000d',
                            }
                        }: null}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                    >
                        Регистрация
                    </Button>
                </form>
            </Container>
        </>
    );
}
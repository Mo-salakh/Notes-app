import { Button, TextField } from "@mui/material";
import { useAuthContext } from "../../app/provider/store/AuthContext";
import { useNavigate } from "react-router-dom";

export function Login() {

    const { handleSubmit } = useAuthContext()
    const navigate = useNavigate()

    const successNav = () => {
        navigate('/')
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e,'login', successNav)} className="form">
                <TextField id="outlined-basic" type="email" name="email" label="Email" variant="outlined" />   
                <TextField id="outlined-basic" type="password" name="password" label="Password" variant="outlined" />   
                <Button variant="contained" type="submit">Войти</Button>
            </form>
        </>
    )
}
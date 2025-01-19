// import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useAuthContext } from "../app/provider/store/AuthContext";

export function AuthStatus() {
    const { isSigned, user, setSigned } = useAuthContext();
    // const navigate = useNavigate();

    const handleClick = () => {
        console.log(isSigned)
    };

    const getOut = () => {
        setSigned('false')
    }

    return (
        <>
            <Typography variant="body2">

                {isSigned ? <>Добро пожаловать, {user?.name} <Button sx={{backgroundColor:'#FFFF', ml:'10px', height:'30px', textTransform:'none'}} variant="outlined" color="error" onClick={getOut}>Выйти</Button></> :
                    <>Вы не вошли в систему <Button sx={{backgroundColor:'#FFFF', ml:'10px', height:'30px', textTransform:'none'}} variant="outlined" color="success" onClick={handleClick} >Войти</Button> </>
                }
            </Typography>
        </>
    )
}

import { Alert, AlertTitle } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function NotFound() {

    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate(-1)
        }, 4000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Alert sx={{textAlign:"center"}} severity="error">
            <AlertTitle>Ошибка 404</AlertTitle>
            Страница не найдена :/
        </Alert>
    )
}
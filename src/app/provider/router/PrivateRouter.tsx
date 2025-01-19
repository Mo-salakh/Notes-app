import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../store/AuthContext";
import { useEffect } from "react";

interface PrivRouterProp {
    children: React.ReactNode
}

export function PrivateRouter({ children }: PrivRouterProp) {
    const { isSigned } = useAuthContext()
    const navigation = useNavigate()
    
    useEffect(() => {
        if(isSigned === 'false') {
            navigation('/auth')
        }
    }, [isSigned, navigation])

    return children
}
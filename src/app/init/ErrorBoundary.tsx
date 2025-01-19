import { Alert, AlertTitle } from "@mui/material";
import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
    children: React.ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    public state: ErrorBoundaryState = {
        hasError: false
    }

    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        console.log(error);
        return {
            hasError: true
        }
    }

    render(): ReactNode {
        if(this.state.hasError) {
            return (
            <Alert sx={{textAlign:"center"}} severity="error">
                <AlertTitle>Ошибка</AlertTitle>
                Что-то пошло не так :/
            </Alert>
            )
        }
        return this.props.children
    }
}
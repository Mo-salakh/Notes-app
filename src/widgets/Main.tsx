import { lazy } from "react";
import { AuthStatus } from "./AuthStatus";

const Note = lazy(() => import("../shared/components/Note").then(module => ({default: module.Note})))
const DeleteAlert = lazy(() => import("../shared/components/DeleteAlert").then(module => ({default: module.DeleteAlert})))

export function Main() {
    return (
        <>

            <AuthStatus />
            <Note />
            <DeleteAlert />
        </>
    )
}
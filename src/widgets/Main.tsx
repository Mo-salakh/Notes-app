import { DeleteAlert } from "../shared/components/DeleteAlert";
import { Note } from "../shared/components/Note";
import { AuthStatus } from "./AuthStatus";

export function Main() {
    return (
        <>
            <AuthStatus />
            <Note />
            <DeleteAlert />
        </>
    )
}
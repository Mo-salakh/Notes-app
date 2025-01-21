import { Route, Routes } from "react-router-dom";
import { HomeLayout } from "../../layout/HomeLayout";
import { AuthLayout } from "../../layout/AuthLayout";
import { Registration } from "../../../pages/registration/Registration";
import { PrivateRouter } from "./PrivateRouter";
import { NotFound } from "../../../pages/notFound/notFound";

export function AppRouter() {

    return (
        <Routes>
            <Route path="/" element={<PrivateRouter><HomeLayout /></PrivateRouter>} />
            <Route path="/auth" element={<AuthLayout />} />
            <Route path="/reg" element={<Registration />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
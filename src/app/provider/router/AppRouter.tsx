import { Route, Routes } from "react-router-dom";
import { HomeLayout } from "../../layout/HomeLayout";
import { AuthLayout } from "../../layout/AuthLayout";
import { PrivateRouter } from "./PrivateRouter";
import { lazy, Suspense } from "react";

const NotFound = lazy(() => import('../../../pages/notFound/notFound').then(module => ({ default: module.NotFound })))
const Registration = lazy(() => import('../../../pages/registration/Registration').then(module => ({ default: module.Registration })))

export function AppRouter() {

    return (
        <Suspense fallback={'Загрузка...'}>
            <Routes>
                <Route path="/" element={<PrivateRouter><HomeLayout /></PrivateRouter>} />
                <Route path="/auth" element={<AuthLayout />} />
                <Route path="/reg" element={<Registration />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}
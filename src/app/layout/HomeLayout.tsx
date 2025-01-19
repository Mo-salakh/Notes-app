import { Header } from "../../widgets/Header";
import { Main } from "../../widgets/Main";
import { SideMenu } from "../../widgets/SideMenu";

export function HomeLayout() {

    return (
        <>
          <Header  />
          <SideMenu />
          <Main />
        </>
    )
}
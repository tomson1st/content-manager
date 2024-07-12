import NavBar from "components/NavBar";
import ActiveResource from "./ActiveResource";
const Layout = ({ children }) => (
  <>
    <NavBar />
    <ActiveResource />
    {children}
  </>
);

export default Layout;

import Drawer from "./drawer.jsx"
import Nav from "./nav.jsx"
import Search from "./search.jsx"

const NavBar = ({pageOn}) => {
    return (
        <Nav Drawer={Drawer} Search={Search} pageOn={pageOn} />
    );
}

export default NavBar;

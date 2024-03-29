import Drawer from "./drawer.jsx"
import Nav from "./nav.jsx"
import Search from "./search.jsx"

const NavBar = () => {
    return (
        <Nav Drawer={Drawer} Search={Search} />
    );
}

export default NavBar;

import Drawer from "./drawer.js"
import Nav from "./nav.js"
import Search from "./search.js"

const NavBar = () => {
    return (
        <Nav Drawer={Drawer} Search={Search}/>
    );
}

export default NavBar;

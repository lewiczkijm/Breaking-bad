import {Link, useLocation} from "react-router-dom";
import { mdiArrowLeftThick } from '@mdi/js';
import {Icon} from '@mdi/react'

export const Header = ()=> {
    let location = useLocation();
    console.log(location)
    return (<header style={{minHeight:84}} className={"panel-heading navbar heading columns"}>
        {location.pathname !== "/" && <Link className={"column is-1 is-align-self-center"} to={"/"}>
            <Icon style={{color: "white"}} className={"icon"} path={mdiArrowLeftThick}/>
        </Link>}
        <h1 className={"column tile"}>Series</h1>
        <div className={"column is-1"}>
            <Link className={" button is-info is-light is-small "} to={"/about"}>About</Link>
        </div>
    </header>)
}
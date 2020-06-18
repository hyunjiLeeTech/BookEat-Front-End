import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        // <nav className="navbar navbar-default navbar-fixed-top">
        //     <div className="topbar">
        //         <div className="container-fluid">
        //             <div className="navbar-header">
        //                 <Link className="navbar-brand" to="/">BookEat</Link>
        //                 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //                     <span className="navbar-toggler-icon"></span>
        //                 </button>
        //             </div>
        //             <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //                 <ul className="nav navbar-nav navbar-right">
        //                     <li className="nav-item"><Link className="glyphicon glyphicon-user" to="/SignUp">Sign Up</Link></li>
        //                     <li className="nav-item"><Link className="glyphicon glyphicon-log-in" to="/">Login</Link></li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="lowerbar bg-muted" >
        //         <ul className="nav navbar-nav bg-muted" >
        //             <li className="nav-item"> <Link className="navbar-brand" to="/">Home</Link> </li>
        //         </ul>
        //     </div>
        // </nav>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink to="/" className="nav-link">BookEat</NavLink> 
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
                        <NavLink to="/home" className="nav-link">Home</NavLink> 
                    </li>
                    <li className="nav-item">
                        <NavLink to="/profile" className="nav-link">Profile</NavLink> 
                    </li>

                    {/* <li className="nav-item">
                        <a className="nav-link disabled" href="#">Disabled</a>
                    </li> */}
                </ul>
                <ul className="navbar-nav navbar-right">
                    <li className="nav-item">
                        {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
                        <NavLink to="/signup" className="nav-link">Sign up</NavLink> 
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login" className="nav-link">Login</NavLink> 
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;

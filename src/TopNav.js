import React from 'react'

function TopNav() {
    return(
        <div className="top_nav">
            <div className="nav_menu">
                <div className="nav toggle">
                    <a id="menu_toggle"><i className="fa fa-bars"></i></a>
                </div>
                <nav className="nav navbar-nav">
                    <ul className=" navbar-right">
                        <li role="presentation" className="nav-item dropdown open">
                            <a href="http://prime-numbers-api.com/" target="_blank" rel="noreferrer" >
                                <i className="fa fa-is-this-number-prime"></i> Prime-Numbers-API.com
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    )
}

export default TopNav
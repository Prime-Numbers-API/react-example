import React from 'react'

function LeftColumn() {
    return(
        <div className="col-md-3 left_col">
            <div className="left_col scroll-view">
                <div className="navbar nav_title">
                    <a href="http://prime-numbers-api.com/" target="_blank" rel="noreferrer" className="site_title">
                        <i className="fa fa-list-ol"></i>
                        <span>Prime Example</span>
                    </a>
                </div>
                <div className="clearfix"></div>
                <br />

                <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                    <div className="menu_section">
                        <ul className="nav side-menu">
                            <li>
                                <a>
                                    <i className="fa fa-book"></i> API Docs
                                    <span className="fa fa-chevron-down"></span>
                                </a>
                                <ul className="nav child_menu">
                                    <li><a href="https://documenter.getpostman.com/view/4967421/U16kqQd3" target="_blank" rel="noreferrer" >is-this-number-prime (free)</a></li>
                                    <li><a href="https://documenter.getpostman.com/view/4967421/U16kqQd3" target="_blank" rel="noreferrer" >get-random-prime (free)</a></li>
                                    <li><a href="https://documenter.getpostman.com/view/4967421/U16kqQd3" target="_blank" rel="noreferrer" >get-all-primes-between-two-numbers (paid)</a></li>
                                    <li><a href="https://documenter.getpostman.com/view/4967421/U16kqQd3" target="_blank" rel="noreferrer" >prospect-primes-between-two-numbers (paid)</a></li>
                                    <li><a href="https://documenter.getpostman.com/view/4967421/U16kqQd3" target="_blank" rel="noreferrer" >get-isolated-random-prime (paid)</a></li>
                                </ul>
                            </li>
                            <li>
                                <a>
                                    <i className="fa fa-github"></i>Code Examples
                                    <span className="fa fa-chevron-down"></span>
                                </a>
                                <ul className="nav child_menu">
                                    <li><a href="https://github.com/Prime-Numbers-API/jquery-example" target="_blank" rel="noreferrer" >JavaScript jQuery Example</a></li>
                                    <li><a href="https://github.com/Prime-Numbers-API/javascript-fetch-example" target="_blank" rel="noreferrer" >JavaScript Fetch Example</a></li>
                                    <li><a href="https://github.com/Prime-Numbers-API/react-example" target="_blank" rel="noreferrer" >React Example</a></li>
                                    <li><a href="https://github.com/Prime-Numbers-API/node-example" target="_blank" rel="noreferrer" >NodeJS Example</a></li>
                                    <li><a href="https://github.com/Prime-Numbers-API/php-example" target="_blank" rel="noreferrer" >PHP Example</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LeftColumn
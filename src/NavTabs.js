import React from 'react'

function NavTabs() {
    return(
        <ul className="nav nav-tabs bar_tabs" id="myTab" role="tablist">
            <li className="nav-item">
                <a className="nav-link active" id="is-this-number-prime-tab" data-toggle="tab" href="#is-this-number-prime" role="tab" aria-controls="is-this-number-prime" aria-selected="true">is this number prime</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" id="get-random-prime-tab" data-toggle="tab" href="#get-random-prime" role="tab" aria-controls="get-random-prime" aria-selected="false">get random prime</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" id="get-all-primes-between-two-numbers-tab" data-toggle="tab" href="#get-all-primes-between-two-numbers" role="tab" aria-controls="get-all-primes-between-two-numbers" aria-selected="false">get all primes between two numbers</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" id="prospect-primes-between-two-numbers-tab" data-toggle="tab" href="#prospect-primes-between-two-numbers" role="tab" aria-controls="prospect-primes-between-two-numbers" aria-selected="false">prospect-primes-between-two-numbers</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" id="get-isolated-random-prime-tab" data-toggle="tab" href="#get-isolated-random-prime" role="tab" aria-controls="get-isolated-random-prime" aria-selected="false">get-isolated-random-prime</a>
            </li>
        </ul>

    )
}

export default NavTabs
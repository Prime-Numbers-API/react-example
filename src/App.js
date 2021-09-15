import React, { Component } from 'react'
import './App.css'
import Search from './Search'
import Book from './Book'
import Header from './Header'

class App extends Component {

    //setup the constructor witht he default props and states
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            error: null,
            params: {
                printType: '',
                filter: '',
                q: ''
            }
        }
    }

    // convert query parameter from an object to a string
    formatQueryParams(params) {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&')
    }

    // if an integer is empty, undefinded or null, default it to 0
    checkInteger(inputInteger) {
        let outputValue = inputInteger
        if (inputInteger === "") {
            outputValue = 0
        }
        if (inputInteger === undefined) {
            outputValue = 0
        }
        if (inputInteger == null) {
            outputValue = 0
        }
        return outputValue
    }

    // if a string is undefinded or null, default it to "no details"
    checkString(inputString) {
        let outputText = inputString
        if (inputString === undefined) {
            outputText = "no details"
        }
        if (inputString == null) {
            outputText = "no details"
        }
        return outputText
    }

    // if a URL is undefinded or null, default it to the root url "/"
    checkURL(inputURL) {
        let outputURL = inputURL
        if (inputURL === undefined) {
            outputURL = "/"
        }
        if (inputURL == null) {
            outputURL = "/"
        }
        return outputURL
    }

    // if a URL is undefinded or null, default it to the root url "/"
    checkEmptyImage(inputURL) {
        let outputURL = inputURL
        if (inputURL === undefined) {
            outputURL = "https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1.png"
        }
        if (inputURL == null) {
            outputURL = "https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1.png"
        }
        return outputURL
    }

    //get the imput from the user
    handleSearch = (e) => {
        e.preventDefault()

        //create an object to store the search filters
        const data = {}

        //get all the from data from the form component
        const formData = new FormData(e.target)

        //for each of the keys in form data populate it with form value
        for (let value of formData) {
            data[value[0]] = value[1]
        }

        //assigning the object from the form data to params in the state
        this.setState({
            params: data
        })

        //check if the state is populated with the search params data
        console.log(this.state.params)

        //get the google books api url
        const searchURL = 'https://www.googleapis.com/books/v1/volumes'

        //format the queryString paramters into an object
        const queryString = this.formatQueryParams(data)

        //sent all the params to the final url
        const url = searchURL + '?' + queryString

        console.log(url)

        //define the API call parameters
        const options = {
            method: 'GET',
            header: {
                "Authorization": "",
                "Content-Type": "application/json"
            }
        }

        //useing the url and paramters above make the api call
        fetch(url, options)

            // if the api returns data ...
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong, please try again later.')
                }

                // ... convert it to json
                return res.json()
            })

            // use the json api output
            .then(data => {

                //check if there is meaningfull data
                console.log(data);

                // check if there are no results
                if (data.totalItems === 0) {
                    throw new Error('No books found')
                }

                // create and object with each one of the results
                const aBooks = data.items.map(book => {

                    // get the title, authors, description, imageLinks, previewLink from "volumeInfo"
                    const { title, authors, description, imageLinks, previewLink } = book.volumeInfo

                    // get the saleability, retailPrice from "saleInfo"
                    const { saleability, retailPrice } = book.saleInfo


                    let validatedOutput = {
                        title: this.checkString(title),
                        author: this.checkString(authors),
                        description: this.checkString(description),
                        previewLink: this.checkURL(previewLink),
                        thumbnail_URL: this.checkEmptyImage(imageLinks.thumbnail),
                        saleability: this.checkInteger(saleability),
                        price: this.checkInteger(retailPrice),
                    }

                    //check if the data validation works
                    console.log(validatedOutput);

                    // fix the inconsitent results and return them
                    return validatedOutput;
                })

                //check if the validated data is structured in a new array objects
                console.log(aBooks);

                //send all the results to the state
                this.setState({
                    books: aBooks,
                    error: null
                })
            })

            //catch connection errors
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })

    }

    render() {

        //if there is an error message display it
        const errorMessage = this.state.error ? <div>{this.state.error}</div> : false

        //get all the books from the state and map each book for the corresponding component
        const books = this.state.books.map((book, i) => {
            return <Book
                key={i}
                title={book.title}
                author={book.author}
                description={book.description}
                previewLink={book.previewLink}
                thumbnail_URL={book.thumbnail_URL}
                saleability={book.saleability}
                price={book.price}
            />
        })


        return (
            <div className="App">
                <Header />
                <Search handleSearch={this.handleSearch} />
                {errorMessage}
                <div className="search-results-wrapper">
                {books}
                </div>
                <div className="container body">
        <div className="main_container">
            <div className="col-md-3 left_col">
                <div className="left_col scroll-view">
                    <div className="navbar nav_title">
                        <a href="http://prime-numbers-api.com/" target="_blank" className="site_title">
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
                                        <li><a href="https://documenter.getpostman.com/view/4967421/U16kqQd3" target="_blank">is-this-number-prime (free)</a></li>
                                        <li><a href="https://documenter.getpostman.com/view/4967421/U16kqQd3" target="_blank">get-random-prime (free)</a></li>
                                        <li><a href="https://documenter.getpostman.com/view/4967421/U16kqQd3" target="_blank">get-all-primes-between-two-numbers (paid)</a></li>
                                        <li><a href="https://documenter.getpostman.com/view/4967421/U16kqQd3" target="_blank">prospect-primes-between-two-numbers (paid)</a></li>
                                        <li><a href="https://documenter.getpostman.com/view/4967421/U16kqQd3" target="_blank">get-isolated-random-prime (paid)</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a>
                                        <i className="fa fa-github"></i>Code Examples
                                        <span className="fa fa-chevron-down"></span>
                                    </a>
                                    <ul className="nav child_menu">
                                        <li><a href="https://github.com/Prime-Numbers-API/jquery-example" target="_blank">JavaScript jQuery Example</a></li>
                                        <li><a href="https://github.com/Prime-Numbers-API/javascript-fetch-example" target="_blank">JavaScript Fetch Example</a></li>
                                        <li><a href="https://github.com/Prime-Numbers-API/react-example" target="_blank">React Example</a></li>
                                        <li><a href="https://github.com/Prime-Numbers-API/node-example" target="_blank">NodeJS Example</a></li>
                                        <li><a href="https://github.com/Prime-Numbers-API/php-example" target="_blank">PHP Example</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            <div className="top_nav">
                <div className="nav_menu">
                    <div className="nav toggle">
                        <a id="menu_toggle"><i className="fa fa-bars"></i></a>
                    </div>
                    <nav className="nav navbar-nav">
                        <ul className=" navbar-right">
                            <li role="presentation" className="nav-item dropdown open">
                                <a href="http://prime-numbers-api.com/" target="_blank">
                                    <i className="fa fa-is-this-number-prime"></i> Prime-Numbers-API.com
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            
            <div className="right_col" role="main">
                <div className="">
                    <div className="clearfix"></div>
                    <div className="row">


                        <div className="col-md-12 col-sm-12  ">
                            <div className="x_panel">
                                <div className="x_title">
                                    <h2>
                                        <a href="http://prime-numbers-api.com/" target="_blank">
                                            <i className="fa fa-is-this-number-prime"></i> Prime-Numbers-API.com
                                        </a>
                                        <small>
                                            <i className="fa fa-chevron-right"></i> JavaScript jQuery Example
                                            </small>
                                    </h2>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="x_content">

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
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="is-this-number-prime" role="tabpanel" aria-labelledby="is-this-number-prime-tab">
                                            <form className="form-horizontal form-label-left is-this-number-prime">
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="is-this-number-prime-apiKey">
                                                        apiKey
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="text" id="is-this-number-prime-apiKey" name="is-this-number-prime-apiKey" required="required" className="form-control  " defaultValue="123" />
                                                        <br />(Required) your API key
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="is-this-number-prime-number-check-number">
                                                        Check Number
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="is-this-number-prime-number-check-number" name="is-this-number-prime-number-check-number" required="required" className="form-control " defaultValue="79" />
                                                        <br />(Required) enter a number to check if it is prime or composite (between 1 and 10^12).
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Explanations</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <select id="is-this-number-prime-include-explanations" className="select2_single form-control" tabindex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full explanations for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Prime Types List</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <select id="is-this-number-prime-include-prime-types-list" className="select2_single form-control" tabindex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full prime types list for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">language <span className="required">*</span>
                                                        </label>

                                                    <div className="col-md-6 col-sm-6 ">
                                                        <select id="is-this-number-prime-language" className="select2_single form-control" tabindex="-1" required="required">
                                                            <option defaultValue="english" selected>english</option>
                                                            <option defaultValue="mandarin">mandarin</option>
                                                            <option defaultValue="hindi">hindi</option>
                                                            <option defaultValue="spanish">spanish</option>
                                                            <option defaultValue="french">french</option>
                                                            <option defaultValue="german">german</option>
                                                            <option defaultValue="italian">italian</option>
                                                            <option defaultValue="japanese">japanese</option>
                                                            <option defaultValue="russian">russian</option>
                                                        </select>
                                                        <br />show the output translated into that language (it can be english, mandarin, hindi, spanish, french, german, italian, japanese, russian) (default is english)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-md-9 col-sm-9  offset-md-3">
                                                        <button className="btn btn-secondary" type="reset">Cancel</button>
                                                        <button type="submit" className="btn btn-success">Submit</button>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="alert alert-danger alert-dismissible show-error error-is-this-number-prime" role="alert">
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                                <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
                                            </div>
                                            
                                            <div className="x_title display-results results-is-this-number-prime">
                                                <h2>Basic Tables <small>basic table subtitle</small></h2>
                                                <ul className="nav navbar-right panel_toolbox">
                                                    <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                                                    </li>
                                                    <li className="dropdown">
                                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            <a className="dropdown-item" href="#">Settings 1</a>
                                                            <a className="dropdown-item" href="#">Settings 2</a>
                                                        </div>
                                                    </li>
                                                    <li><a className="close-link"><i className="fa fa-close"></i></a>
                                                    </li>
                                                </ul>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="x_content display-results results-is-this-number-prime">

                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Key</th>
                                                            <th>Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="results-is-this-number-prime-show">

                                                    </tbody>
                                                </table>

                                            </div>

                                            
                                        </div>
                                        <div className="tab-pane fade" id="get-random-prime" role="tabpanel" aria-labelledby="get-random-prime-tab">
                                            <form className="form-horizontal form-label-left get-random-prime">
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get-random-prime-apiKey">
                                                        apiKey
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="text" id="get-random-prime-apiKey" name="get-random-prime-apiKey" required="required" className="form-control  " defaultValue="123" />
                                                        <br />(Required) your API key
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get-random-prime-start">
                                                        start
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="get-random-prime-start" name="get-random-prime-start" required="required" className="form-control " defaultValue="330" />
                                                        <br />(Required if the end is specified) the number from which the process will start (needs to be smaller than the end)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get-random-prime-end">
                                                        end
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="get-random-prime-end" name="get-random-prime-end" required="required" className="form-control " defaultValue="1000" />
                                                        <br />(Required if the start is specified) the number to which the process will end (needs to be larger than the start)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Explanations</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <select id="get-random-prime-include-explanations" className="select2_single form-control" tabindex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full explanations for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Prime Types List</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <select id="get-random-prime-include-prime-types-list" className="select2_single form-control" tabindex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full prime types list for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">language <span className="required">*</span>
                                                        </label>

                                                    <div className="col-md-6 col-sm-6 ">
                                                        <select id="get-random-prime-language" className="select2_single form-control" tabindex="-1" required="required">
                                                            <option defaultValue="english" selected>english</option>
                                                            <option defaultValue="mandarin">mandarin</option>
                                                            <option defaultValue="hindi">hindi</option>
                                                            <option defaultValue="spanish">spanish</option>
                                                            <option defaultValue="french">french</option>
                                                            <option defaultValue="german">german</option>
                                                            <option defaultValue="italian">italian</option>
                                                            <option defaultValue="japanese">japanese</option>
                                                            <option defaultValue="russian">russian</option>
                                                        </select>
                                                        <br />show the output translated into that language (it can be english, mandarin, hindi, spanish, french, german, italian, japanese, russian) (default is english)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-md-9 col-sm-9  offset-md-3">
                                                        <button className="btn btn-secondary" type="reset">Cancel</button>
                                                        <button type="submit" className="btn btn-success">Submit</button>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="alert alert-danger alert-dismissible show-error error-get-random-prime" role="alert">
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                                <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
                                            </div>
                                            
                                            <div className="x_title display-results results-get-random-prime">
                                                <h2>Basic Tables <small>basic table subtitle</small></h2>
                                                <ul className="nav navbar-right panel_toolbox">
                                                    <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                                                    </li>
                                                    <li className="dropdown">
                                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            <a className="dropdown-item" href="#">Settings 1</a>
                                                            <a className="dropdown-item" href="#">Settings 2</a>
                                                        </div>
                                                    </li>
                                                    <li><a className="close-link"><i className="fa fa-close"></i></a>
                                                    </li>
                                                </ul>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="x_content display-results results-get-random-prime">

                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Key</th>
                                                            <th>Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="results-get-random-prime-show">

                                                    </tbody>
                                                </table>

                                            </div>

                                            
                                        </div>
                                        <div className="tab-pane fade" id="get-all-primes-between-two-numbers" role="tabpanel" aria-labelledby="get-all-primes-between-two-numbers-tab">
                                            <form className="form-horizontal form-label-left get-all-primes-between-two-numbers">
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get-all-primes-between-two-numbers-apiKey">
                                                        apiKey
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="text" id="get-all-primes-between-two-numbers-apiKey" name="get-all-primes-between-two-numbers-apiKey" required="required" className="form-control  " defaultValue="123" />
                                                        <br />(Required) your API key
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get-all-primes-between-two-numbers-start">
                                                        start
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="get-all-primes-between-two-numbers-start" name="get-all-primes-between-two-numbers-start" required="required" className="form-control " defaultValue="330" />
                                                        <br />(Required if the end is specified) the number from which the process will start (needs to be smaller than the end)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get-all-primes-between-two-numbers-end">
                                                        end
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="get-all-primes-between-two-numbers-end" name="get-all-primes-between-two-numbers-end" required="required" className="form-control " defaultValue="1000" />
                                                        <br />(Required if the start is specified) the number to which the process will end (needs to be larger than the start)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Explanations</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <select id="get-all-primes-between-two-numbers-include-explanations" className="select2_single form-control" tabindex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full explanations for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Prime Types List</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <select id="get-all-primes-between-two-numbers-include-prime-types-list" className="select2_single form-control" tabindex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full prime types list for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">language <span className="required">*</span>
                                                        </label>

                                                    <div className="col-md-6 col-sm-6 ">
                                                        <select id="get-all-primes-between-two-numbers-language" className="select2_single form-control" tabindex="-1" required="required">
                                                            <option defaultValue="english" selected>english</option>
                                                            <option defaultValue="mandarin">mandarin</option>
                                                            <option defaultValue="hindi">hindi</option>
                                                            <option defaultValue="spanish">spanish</option>
                                                            <option defaultValue="french">french</option>
                                                            <option defaultValue="german">german</option>
                                                            <option defaultValue="italian">italian</option>
                                                            <option defaultValue="japanese">japanese</option>
                                                            <option defaultValue="russian">russian</option>
                                                        </select>
                                                        <br />show the output translated into that language (it can be english, mandarin, hindi, spanish, french, german, italian, japanese, russian) (default is english)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-md-9 col-sm-9  offset-md-3">
                                                        <button className="btn btn-secondary" type="reset">Cancel</button>
                                                        <button type="submit" className="btn btn-success">Submit</button>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="alert alert-danger alert-dismissible show-error error-get-all-primes-between-two-numbers" role="alert">
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                                <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
                                            </div>
                                            
                                            <div className="x_title display-results results-get-all-primes-between-two-numbers">
                                                <h2>Basic Tables <small>basic table subtitle</small></h2>
                                                <ul className="nav navbar-right panel_toolbox">
                                                    <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                                                    </li>
                                                    <li className="dropdown">
                                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            <a className="dropdown-item" href="#">Settings 1</a>
                                                            <a className="dropdown-item" href="#">Settings 2</a>
                                                        </div>
                                                    </li>
                                                    <li><a className="close-link"><i className="fa fa-close"></i></a>
                                                    </li>
                                                </ul>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="x_content display-results results-get-all-primes-between-two-numbers">

                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Key</th>
                                                            <th>Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="results-get-all-primes-between-two-numbers-show">

                                                    </tbody>
                                                </table>

                                            </div>

                                            
                                        </div>
                                        <div className="tab-pane fade" id="prospect-primes-between-two-numbers" role="tabpanel" aria-labelledby="prospect-primes-between-two-numbers">
                                            <form className="form-horizontal form-label-left prospect-primes-between-two-numbers">
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="prospect-primes-between-two-numbers-apiKey">
                                                        apiKey
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="text" id="prospect-primes-between-two-numbers-apiKey" name="prospect-primes-between-two-numbers-apiKey" required="required" className="form-control  " defaultValue="123" />
                                                        <br />(Required) your API key
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="prospect-primes-between-two-numbers-start">
                                                        start
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="prospect-primes-between-two-numbers-start" name="prospect-primes-between-two-numbers-start" required="required" className="form-control " defaultValue="330" />
                                                        <br />(Required if the end is specified) the number from which the process will start (needs to be smaller than the end)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="prospect-primes-between-two-numbers-end">
                                                        end
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="prospect-primes-between-two-numbers-end" name="prospect-primes-between-two-numbers-end" required="required" className="form-control " defaultValue="1000" />
                                                        <br />(Required if the start is specified) the number to which the process will end (needs to be larger than the start)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Explanations</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <select id="prospect-primes-between-two-numbers-include-explanations" className="select2_single form-control" tabindex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full explanations for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Prime Types List</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <select id="prospect-primes-between-two-numbers-include-prime-types-list" className="select2_single form-control" tabindex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full prime types list for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">language <span className="required">*</span>
                                                        </label>

                                                    <div className="col-md-6 col-sm-6 ">
                                                        <select id="prospect-primes-between-two-numbers-language" className="select2_single form-control" tabindex="-1" required="required">
                                                            <option defaultValue="english" selected>english</option>
                                                            <option defaultValue="mandarin">mandarin</option>
                                                            <option defaultValue="hindi">hindi</option>
                                                            <option defaultValue="spanish">spanish</option>
                                                            <option defaultValue="french">french</option>
                                                            <option defaultValue="german">german</option>
                                                            <option defaultValue="italian">italian</option>
                                                            <option defaultValue="japanese">japanese</option>
                                                            <option defaultValue="russian">russian</option>
                                                        </select>
                                                        <br />show the output translated into that language (it can be english, mandarin, hindi, spanish, french, german, italian, japanese, russian) (default is english)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-md-9 col-sm-9  offset-md-3">
                                                        <button className="btn btn-secondary" type="reset">Cancel</button>
                                                        <button type="submit" className="btn btn-success">Submit</button>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="alert alert-danger alert-dismissible show-error error-prospect-primes-between-two-numbers" role="alert">
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                                <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
                                            </div>
                                            
                                            <div className="x_title display-results results-prospect-primes-between-two-numbers">
                                                <h2>Basic Tables <small>basic table subtitle</small></h2>
                                                <ul className="nav navbar-right panel_toolbox">
                                                    <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                                                    </li>
                                                    <li className="dropdown">
                                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            <a className="dropdown-item" href="#">Settings 1</a>
                                                            <a className="dropdown-item" href="#">Settings 2</a>
                                                        </div>
                                                    </li>
                                                    <li><a className="close-link"><i className="fa fa-close"></i></a>
                                                    </li>
                                                </ul>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="x_content display-results results-prospect-primes-between-two-numbers">

                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Key</th>
                                                            <th>Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="results-prospect-primes-between-two-numbers-show">

                                                    </tbody>
                                                </table>

                                            </div>

                                            
                                        </div>
                                        <div className="tab-pane fade" id="get-isolated-random-prime" role="tabpanel" aria-labelledby="get-isolated-random-prime">
                                            <form className="form-horizontal form-label-left get-isolated-random-prime">
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get-isolated-random-prime-apiKey">
                                                        apiKey
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="text" id="get-isolated-random-prime-apiKey" name="get-isolated-random-prime-apiKey" required="required" className="form-control  " defaultValue="123" />
                                                        <br />(Required) your API key
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get-isolated-random-prime-minimum-combined-prime-gap">
                                                        Minimum Combined Prime Gap
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="get-isolated-random-prime-minimum-combined-prime-gap" name="get-isolated-random-prime-minimum-combined-prime-gap" required="required" className="form-control " defaultValue="200" />
                                                        <br />the total numbers of neighbouring composite numbers on the right and on the left of the current prime number, determines how isolated this prime is and how hard it is to find it (value between
                                                        200 and 500) (default is 200)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Explanations</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <select id="get-isolated-random-prime-include-explanations" className="select2_single form-control" tabindex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full explanations for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Prime Types List</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <select id="get-isolated-random-prime-include-prime-types-list" className="select2_single form-control" tabindex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full prime types list for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">language <span className="required">*</span>
                                                        </label>

                                                    <div className="col-md-6 col-sm-6 ">
                                                        <select id="get-isolated-random-prime-language" className="select2_single form-control" tabindex="-1" required="required">
                                                            <option defaultValue="english" selected>english</option>
                                                            <option defaultValue="mandarin">mandarin</option>
                                                            <option defaultValue="hindi">hindi</option>
                                                            <option defaultValue="spanish">spanish</option>
                                                            <option defaultValue="french">french</option>
                                                            <option defaultValue="german">german</option>
                                                            <option defaultValue="italian">italian</option>
                                                            <option defaultValue="japanese">japanese</option>
                                                            <option defaultValue="russian">russian</option>
                                                        </select>
                                                        <br />show the output translated into that language (it can be english, mandarin, hindi, spanish, french, german, italian, japanese, russian) (default is english)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-md-9 col-sm-9  offset-md-3">
                                                        <button className="btn btn-secondary" type="reset">Cancel</button>
                                                        <button type="submit" className="btn btn-success">Submit</button>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="alert alert-danger alert-dismissible show-error error-prospect-primes-between-two-numbers" role="alert">
                                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                                <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
                                            </div>
                                            
                                            <div className="x_title display-results results-get-isolated-random-prime">
                                                <h2>Basic Tables <small>basic table subtitle</small></h2>
                                                <ul className="nav navbar-right panel_toolbox">
                                                    <li><a className="collapse-link"><i className="fa fa-chevron-up"></i></a>
                                                    </li>
                                                    <li className="dropdown">
                                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-wrench"></i></a>
                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                            <a className="dropdown-item" href="#">Settings 1</a>
                                                            <a className="dropdown-item" href="#">Settings 2</a>
                                                        </div>
                                                    </li>
                                                    <li><a className="close-link"><i className="fa fa-close"></i></a>
                                                    </li>
                                                </ul>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="x_content display-results results-get-isolated-random-prime">

                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Key</th>
                                                            <th>Value</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="results-get-isolated-random-prime-show">

                                                    </tbody>
                                                </table>

                                            </div>

                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            <footer>
                <div className="pull-right">
                    © <a href="http://prime-numbers-api.com/" target="_blank">Prime-Numbers-API.com</a>
                </div>
                <div className="clearfix"></div>
            </footer>
            
        </div>
    </div>
            </div>
        )
    }
}

export default App

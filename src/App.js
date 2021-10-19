import React, { useState, useEffect } from 'react'
import './App.css'
import IsThisNumberPrimeResults from './IsThisNumberPrimeResults'
import GetRandomPrimeResults from './GetRandomPrime'
import LeftColumn from './LeftColumn'
import TopNav from './TopNav'
import Footer from './Footer'
import NavTabs from './NavTabs'

const App = (props) => {
    // const [state, setState] = useState({
    //     results: {},
    //     error: null,
    //     params: {
    //         is_this_number_prime_apiKey: 0,
    //         is_this_number_prime_include_explanations: false,
    //         is_this_number_prime_include_prime_types_list: false,
    //         is_this_number_prime_language: "english",
    //         is_this_number_prime_check_number: 0
    //     }
    // })

    const [results, setResults] = useState({});
    const [error, setError] = useState(null);
    const [params, setParams] = useState([{
        // is_this_number_prime_apiKey: 0,
        // is_this_number_prime_include_explanations: false,
        // is_this_number_prime_include_prime_types_list: false,
        // is_this_number_prime_language: "english",
        // is_this_number_prime_check_number: 0,
    }]);
    // console.log(params)

    // convert query parameter from an object to a string
   const formatQueryParams = (params) => {
        const queryItems = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&')
    }

    // if an integer is empty, undefined or null, default it to 0
    const checkInteger = (inputInteger) => {
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

    // if a string is undefined or null, default it to "no details"
    const checkString = (inputString) => {
        let outputText = inputString
        if (inputString === undefined) {
            outputText = "no details"
        }
        if (inputString == null) {
            outputText = "no details"
        }
        return outputText
    }

    // if a URL is undefined or null, default it to the root url "/"
    const checkURL = (inputURL) => {
        let outputURL = inputURL
        if (inputURL === undefined) {
            outputURL = "/"
        }
        if (inputURL == null) {
            outputURL = "/"
        }
        return outputURL
    }

    // if a URL is undefined or null, default it to the root url "/"
    const checkEmptyImage = (inputURL) => {
        let outputURL = inputURL
        if (inputURL === undefined) {
            outputURL = "https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1.png"
        }
        if (inputURL == null) {
            outputURL = "https://legacytaylorsville.com/wp-content/uploads/2015/07/No-Image-Available1.png"
        }
        return outputURL
    }

    //get the input from the user
    const handleIsThisNumberPrimeSearch = (e) => {
        e.preventDefault()

        //create an object to store the search filters
        const data = {}

        //get all the from data from the form component
        const formData = new FormData(e.target)

        //for each of the keys in form data populate it with form value
        for (let value of formData) {
            data[value[0]] = value[1]
        }

        //check if the state is populated with the search params data
        //console.log("data before passing to state: ", data)
        //console.log("params before setState: ", params)
        

        //assigning the object from the form data to params in the state
        setParams(prevState => ({
            ...prevState, //shallow copy of level 0 (params) but ONLY REFERENCES the key/value pairs
            params: data
            
        }))

        let is_this_number_prime_api_url = `http://api.prime-numbers.io/is-this-number-prime.php?key=${data.is_this_number_prime_apiKey}&number=${data.is_this_number_prime_check_number}&include_explanations=${data.is_this_number_prime_include_explanations}&include_prime_types_list=${data.is_this_number_prime_include_prime_types_list}&language=${data.is_this_number_prime_language}`

        // console.log(is_this_number_prime_api_url)
        
        //using the url and parameters above make the api call
        const fetchData = async (is_this_number_prime_api_url) => {
                const response = await fetch(is_this_number_prime_api_url)
                const data = await response.json();
                setResults(prevState => ({
                    ...prevState,
                    results: data
                }))
                // .then(response => {
                //     if (response.ok) {
                //         return response.json();
                //     }
                //     return response.json().then(response => { throw new Error(response.error) })
                // })
                // .then(responseJson => {
                //     // console.log(responseJson);
                //     const responseResults = responseJson;
                //     // console.log(results);
                //     // let current_is_this_number_prime_results = responseJson
                // // let updated_is_this_number_prime_results = current_is_this_number_prime_results.push(responseJson);
                //     // console.log(updated_is_this_number_prime_results);
                //     setResults(prevState => ({
                //         // is_this_number_prime_results: current_is_this_number_prime_results,
                //         ...prevState,
                //         results: responseResults
                //         // error: null
                //     }))
                // })
                
                // .catch(err => {
                //     const responseErr = err;
                //     console.log(err);
                //     setError(prevState => ({
                //         error: responseErr
                //     }))
                //     // displayError(err, "error-is-this-number-prime")
                // })
                // handleResults(data);
            }         
            return fetchData(is_this_number_prime_api_url);
         
    }


    
    const handleGetRandomPrimeSearch = (e) => {
        e.preventDefault()

        //create an object to store the search filters
        const data = {}

        //get all the from data from the form component
        const formData = new FormData(e.target)

        //for each of the keys in form data populate it with form value
        for (let value of formData) {
            data[value[0]] = value[1]
        }

        //check if the state is populated with the search params data
        //console.log("data before passing to state: ", data)
        //console.log("params before setState: ", params)
        

        //assigning the object from the form data to params in the state
        setParams(prevState => ({
            ...prevState, 
            params: data
            
        }))
        console.log(data)
        let get_random_prime_api_url = `http://api.prime-numbers.io/get-random-prime.php?key=${data.get_random_prime_apiKey}&start=${data.get_random_prime_start}&end=${data.get_random_prime_end}&include_explanations=${data.get_random_prime_include_explanations}&include_prime_types_list=${data.get_random_prime_include_prime_types_list}&language=${data.get_random_prime_language}`

        console.log(get_random_prime_api_url)
        
        //using the url and parameters above make the api call
        const fetchData = async (get_random_prime_api_url) => {
                const response = await fetch(get_random_prime_api_url)
                const data = await response.json();
                setResults(prevState => ({
                    ...prevState,
                    results: data
                }))
                
            }         
            return fetchData(get_random_prime_api_url);
         
    }
        
    // console.log("state results: ", results);
    console.log("state.params after setState: ", params);

        //if there is an error message display it
        
        const errorMessage = error ? <div className="alert alert-danger alert-dismissible show-error error-is-this-number-prime" role="alert"> <button type="button" className="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">×</span> </button> <strong>{error}</strong> </div> : false

        // console.log("errorMessage: ", errorMessage)
        // console.log("state error: ", error)

        const isThisNumberPrimeResultsOutput = results ? <IsThisNumberPrimeResults
        key="1"
        type="is_this_number_prime"
        content={results}
    /> : "";

        const getRandomPrimeResultsOutput = results ? <GetRandomPrimeResults
        key="1"
        type="is_this_number_prime"
        content={results}
    /> : "";

    
        


        return (
        <div className="main_container">
            <LeftColumn />
            <TopNav />
            
            
            
            <div className="right_col" role="main">
                <div className="">
                    <div className="clearfix"></div>
                    <div className="row">


                        <div className="col-md-12 col-sm-12  ">
                            <div className="x_panel">
                                <div className="x_title">
                                    <h2>
                                        <a href="http://prime-numbers-api.com/" target="_blank" rel="noreferrer" >
                                            <i className="fa fa-is-this-number-prime"></i> Prime-Numbers-API.com
                                        </a>
                                        <small>
                                            <i className="fa fa-chevron-right"></i> React Example
                                            </small>
                                    </h2>
                                    <div className="clearfix"></div>
                                </div>
                                <div className="x_content">
                                    <NavTabs / >
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="is-this-number-prime" role="tabpanel" aria-labelledby="is-this-number-prime-tab">
                                            <form onSubmit={handleIsThisNumberPrimeSearch} className="form-horizontal form-label-left is-this-number-prime">
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="is_this_number_prime_apiKey">
                                                        apiKey
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="text" id="is_this_number_prime_apiKey" name="is_this_number_prime_apiKey" required="required" className="form-control  " defaultValue="123" />
                                                        <br />(Required) your API key
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="is_this_number_prime_check_number">
                                                        Check Number
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="is_this_number_prime_check_number" name="is_this_number_prime_check_number" required="required" className="form-control " defaultValue="79" />
                                                        <br />(Required) enter a number to check if it is prime or composite (between 1 and 10^12).
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Explanations</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                            <select id="is_this_number_prime_include_explanations" name="is_this_number_prime_include_explanations"  className="select2_single form-control" tabIndex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full explanations for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Prime Types List</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                            <select id="is_this_number_prime_include_prime_types_list" name="is_this_number_prime_include_prime_types_list" className="select2_single form-control" tabIndex="-1" required="required">
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
                                                            <select id="is_this_number_prime_language" name="is_this_number_prime_language" className="select2_single form-control" tabIndex="-1" required="required">
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
                                            {errorMessage}
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
                                                        {isThisNumberPrimeResultsOutput}

                                                    </tbody>
                                                </table>

                                            </div>

                                            
                                        </div>
                                        <div className="tab-pane fade" id="get-random-prime" role="tabpanel" aria-labelledby="get-random-prime-tab">
                                            <form onSubmit={handleGetRandomPrimeSearch} className="form-horizontal form-label-left get-random-prime">
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get_random_prime_apiKey">
                                                        apiKey
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="text" id="get_random_prime_apiKey" name="get_random_prime_apiKey" required="required" className="form-control  " defaultValue="123" />
                                                        <br />(Required) your API key
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get_random_prime_start">
                                                        start
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="get_random_prime_start" name="get_random_prime_start" required="required" className="form-control " defaultValue="330" />
                                                        <br />(Required if the end is specified) the number from which the process will start (needs to be smaller than the end)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get_random_prime_end">
                                                        end
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="get_random_prime_end" name="get_random_prime_end" required="required" className="form-control " defaultValue="1000" />
                                                        <br />(Required if the start is specified) the number to which the process will end (needs to be larger than the start)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Explanations</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                            <select id="get-random-prime-include_explanations" name="get-random-prime-include_explanations" className="select2_single form-control" tabIndex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full explanations for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Prime Types List</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                            <select id="get_random_prime_include_prime_types_list" name="get_random_prime_include_prime_types_list"  className="select2_single form-control" tabIndex="-1" required="required">
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
                                                            <select id="get_random_prime_language" name="get_random_prime_language" className="select2_single form-control" tabIndex="-1" required="required">
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
                                            {errorMessage}
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
                                                        {getRandomPrimeResultsOutput}
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
                                                            <select id="get-all-primes-between-two-numbers-include-explanations" name="get-all-primes-between-two-numbers-include-explanations" className="select2_single form-control" tabIndex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full explanations for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Prime Types List</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                            <select id="get-all-primes-between-two-numbers-include-prime-types-list" name="get-all-primes-between-two-numbers-include-prime-types-list" className="select2_single form-control" tabIndex="-1" required="required">
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
                                                            <select id="get-all-primes-between-two-numbers-language" name="get-all-primes-between-two-numbers-language"  className="select2_single form-control" tabIndex="-1" required="required">
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
                                                            <select id="prospect-primes-between-two-numbers-include-explanations" name="prospect-primes-between-two-numbers-include-explanations" className="select2_single form-control" tabIndex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full explanations for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Prime Types List</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                            <select id="prospect-primes-between-two-numbers-include-prime-types-list" name="prospect-primes-between-two-numbers-include-prime-types-list" className="select2_single form-control" tabIndex="-1" required="required">
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
                                                            <select id="prospect-primes-between-two-numbers-language" name="prospect-primes-between-two-numbers-language" className="select2_single form-control" tabIndex="-1" required="required">
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
                                                            <select id="get-isolated-random-prime-include-explanations" name="get-isolated-random-prime-include-explanations" className="select2_single form-control" tabIndex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full explanations for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Prime Types List</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                            <select id="get-isolated-random-prime-include-prime-types-list" name="get-isolated-random-prime-include-prime-types-list" className="select2_single form-control" tabIndex="-1" required="required">
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
                                                            <select id="get-isolated-random-prime-language" name="get-isolated-random-prime-language" className="select2_single form-control" tabIndex="-1" required="required">
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
            
            <Footer />
        </div>
        )
    
}

export default App

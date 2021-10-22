import React, { useState } from 'react'
import './App.css'
import IsThisNumberPrimeResults from './IsThisNumberPrimeResults'
import GetRandomPrimeResults from './GetRandomPrime'
import GetAllPrimesBetweenTwoNumbersResults from './GetAllPrimesBetweenTwoNumbersResults'
import ProspectPrimesBetweenTwoNumbersResults from './prospectAllPrimesBetweenTwoNumbers'
import GetIsolatedRandomPrimeResults from './GetIsolatedRandomPrime'
import LeftColumn from './LeftColumn'
import TopNav from './TopNav'
import Footer from './Footer'
import NavTabs from './NavTabs'
import ErrorHandler from './ErrorHandler'

const App = (props) => {
    const [results, setResults] = useState({});
    const [error, setError] = useState(false);
    const [params, setParams] = useState([{}]);


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
            ...prevState, 
            params: data
            
        }))

        let is_this_number_prime_api_url = `http://api.prime-numbers.io/is-this-number-prime.php?key=${data.is_this_number_prime_apiKey}&number=${data.is_this_number_prime_check_number}&include_explanations=${data.is_this_number_prime_include_explanations}&include_prime_types_list=${data.is_this_number_prime_include_prime_types_list}&language=${data.is_this_number_prime_language}`

        // console.log(is_this_number_prime_api_url)

        // const errorThrow = async () => {
        //     throw new TypeError("Error! Something went wrong")
        // }
        
        //using the url and parameters above make the api call
        const fetchData = async (is_this_number_prime_api_url) => {
                const response = await fetch(is_this_number_prime_api_url)
                const data = await response.json();
                //clear any error that might be in state
                setError( prevState => ({
                    ...prevState,
                    error: false
                }))
                try {
                    if (response.ok) {
                        setResults(prevState => ({
                            ...prevState,
                            results: data,
                        }))
                    } else {
                        throw new Error(response.error) 
                    }
                } catch (err) {
                    setError( prevState => ({
                        ...prevState,
                        error: err
                    }))
                } 
                
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
        // console.log(data)
        let get_random_prime_api_url = `http://api.prime-numbers.io/get-random-prime.php?key=${data.get_random_prime_apiKey}&start=${data.get_random_prime_start}&end=${data.get_random_prime_end}&include_explanations=${data.get_random_prime_include_explanations}&include_prime_types_list=${data.get_random_prime_include_prime_types_list}&language=${data.get_random_prime_language}`

        // console.log(get_random_prime_api_url)
        
        //using the url and parameters above make the api call
        const fetchData = async (get_random_prime_api_url) => {
                const response = await fetch(get_random_prime_api_url)
                const data = await response.json();
                setError( prevState => ({
                    ...prevState,
                    error: false
                }))
                try {
                    if (response.ok) {
                        setResults(prevState => ({
                            ...prevState,
                            results: data,
                        }))
                    } else {
                        throw new Error(response.error) 
                    }
                } catch (err) {
                    setError( prevState => ({
                        ...prevState,
                        error: err
                    }))
                } 
                
            }         
            return fetchData(get_random_prime_api_url);
         
    }


    const handleGetAllPrimesBetweenTwoNumbersSearch = (e) => {
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
        // console.log(data)
        let get_all_primes_between_two_numbers_api_url = `http://api.prime-numbers.io/get-all-primes-between-two-numbers.php?key=${data.get_all_primes_between_two_numbers_apiKey}&start=${data.get_all_primes_between_two_numbers_start}&end=${data.get_all_primes_between_two_numbers_end}&include_explanations=${data.get_all_primes_between_two_numbers_include_explanations}&include_prime_types_list=${data.get_all_primes_between_two_numbers_include_prime_types_list}&language=${data.get_all_primes_between_two_numbers_language}`

        // console.log(get_all_primes_between_two_numbers_api_url)
        
        //using the url and parameters above make the api call
        const fetchData = async (get_all_primes_between_two_numbers_api_url) => {
                const response = await fetch(get_all_primes_between_two_numbers_api_url)
                const data = await response.json();
                setError( prevState => ({
                    ...prevState,
                    error: false
                }))
                try {
                    if (response.ok) {
                        setResults(prevState => ({
                            ...prevState,
                            results: data,
                        }))
                    } else {
                        throw new Error(response.error) 
                    }
                } catch (err) {
                    setError( prevState => ({
                        ...prevState,
                        error: err
                    }))
                } 
                
            }         
            return fetchData(get_all_primes_between_two_numbers_api_url);
         
    }





    const handleProspectPrimesBetweenTwoNumbers = (e) => {
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
        // console.log(data)
        let prospect_primes_between_two_numbers_api_url = `http://api.prime-numbers.io/prospect-primes-between-two-numbers.php?key=${data.prospect_primes_between_two_numbers_apiKey}&start=${data.prospect_primes_between_two_numbers_start}&end=${data.prospect_primes_between_two_numbers_end}&include_explanations=${data.prospect_primes_between_two_numbers_include_explanations}&include_prime_types_list=${data.prospect_primes_between_two_numbers_include_prime_types_list}&language=${data.prospect_primes_between_two_numbers_language}`

        // console.log(prospect_primes_between_two_numbers_api_url)
        
        //using the url and parameters above make the api call
        const fetchData = async (prospect_primes_between_two_numbers_api_url) => {
                const response = await fetch(prospect_primes_between_two_numbers_api_url)
                const data = await response.json();
                setError( prevState => ({
                    ...prevState,
                    error: false
                }))
                try {
                    if (response.ok) {
                        setResults(prevState => ({
                            ...prevState,
                            results: data,
                        }))
                    } else {
                        throw new Error(response.error) 
                    }
                } catch (err) {
                    setError( prevState => ({
                        ...prevState,
                        error: err
                    }))
                } 
                
            }         
            return fetchData(prospect_primes_between_two_numbers_api_url);
         
    }


    const handleGetIsolatedRandomPrime = (e) => {
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
        // console.log(data)
        let get_isolated_random_prime_api_url = `http://api.prime-numbers.io/get-isolated-random-prime.php?key=${data.get_isolated_random_prime_apiKey}&minimum_combined_prime_gap=${data.get_isolated_random_prime_minimum_combined_prime_gap}&include_explanations=${data.get_isolated_random_prime_include_explanations}&include_prime_types_list=${data.get_isolated_random_prime_include_prime_types_list}&language=${data.get_isolated_random_prime_language}`

        // console.log(get_isolated_random_prime_api_url)
        
        //using the url and parameters above make the api call
        const fetchData = async (get_isolated_random_prime_api_url) => {
                const response = await fetch(get_isolated_random_prime_api_url)
                const data = await response.json();
                setError( prevState => ({
                    ...prevState,
                    error: false
                }))
                try {
                    if (response.ok) {
                        setResults(prevState => ({
                            ...prevState,
                            results: data,
                        }))
                    } else {
                        throw new Error(response.error) 
                    }
                } catch (err) {
                    setError( prevState => ({
                        ...prevState,
                        error: err
                    }))
                } 
                
            }         
            return fetchData(get_isolated_random_prime_api_url);
         
    }
        
    // console.log("state results: ", results);
    // console.log("state.params after setState: ", params);

        //if there is an error message display it

        
        // const errorMessage = error ? error.toString
        // const errorBuilder = () => {
        //     const iterateError = (errorObject) => {
        //         console.log(typeof errorObject)
        //         let errorMessage = ''
        //         for (let key in errorObject) {
        //             console.log("iteratedErrorKey: ", key)
        //             errorMessage += `${errorObject[key]}`
        //         }
        //         return (
        //             errorMessage
        //         )
    
        //     }

        //     console.log("typeof error: ", typeof error)
        //     console.log("errorMessage: ", errorMessage)
        //     console.log(error)
        //     return errorMessage
            
        // }
            const errorMessage = error && (typeof error == 'object') ? <ErrorHandler
            content={error}
            /> : ""
    

        const isThisNumberPrimeResultsOutput = results ? <IsThisNumberPrimeResults
        key="1"
        type="is_this_number_prime"
        content={results}
    /> : "";

        const getRandomPrimeResultsOutput = results ? <GetRandomPrimeResults
        key="1"
        type="get_random_prime"
        content={results}
    /> : "";

        const getAllPrimesBetweenTwoNumbersResultsOutput = results ? <GetAllPrimesBetweenTwoNumbersResults
        key="1"
        type="get_all_primes_between_two_numbers"
        content={results}
    /> : "";

        const ProspectPrimesBetweenTwoNumbersResultsOutput = results ? <ProspectPrimesBetweenTwoNumbersResults
        key="1"
        type="prospect_primes_between_two_numbers"
        content={results}
    /> : "";

        const GetIsolatedRandomPrimeResultsOutput = results ? <GetIsolatedRandomPrimeResults
        key="1"
        type="get_isolated_random_prime"
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
                                                            <select id="get_random_prime_include_explanations" name="get_random_prime_include_explanations" className="select2_single form-control" tabIndex="-1" required="required">
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
                                            <form onSubmit={handleGetAllPrimesBetweenTwoNumbersSearch} className="form-horizontal form-label-left get-all-primes-between-two-numbers">
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get_all_primes_between_two_numbers_apiKey">
                                                        apiKey
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="text" id="get_all_primes_between_two_numbers_apiKey" name="get_all_primes_between_two_numbers_apiKey" required="required" className="form-control  " defaultValue="123" />
                                                        <br />(Required) your API key
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get_all_primes_between_two_numbers_start">
                                                        start
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="get_all_primes_between_two_numbers_start" name="get_all_primes_between_two_numbers_start" required="required" className="form-control " defaultValue="330" />
                                                        <br />(Required if the end is specified) the number from which the process will start (needs to be smaller than the end)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get_all_primes_between_two_numbers_end">
                                                        end
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="get_all_primes_between_two_numbers_end" name="get_all_primes_between_two_numbers_end" required="required" className="form-control " defaultValue="1000" />
                                                        <br />(Required if the start is specified) the number to which the process will end (needs to be larger than the start)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Explanations</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                            <select id="get_all_primes_between_two_numbers_include_explanations" name="get_all_primes_between_two_numbers_include_explanations" className="select2_single form-control" tabIndex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full explanations for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Prime Types List</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                            <select id="get_all_primes_between_two_numbers_include_prime_types_list" name="get_all_primes_between_two_numbers_include_prime_types_list" className="select2_single form-control" tabIndex="-1" required="required">
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
                                                            <select id="get_all_primes_between_two_numbers_language" name="get_all_primes_between_two_numbers_language"  className="select2_single form-control" tabIndex="-1" required="required">
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
                                                        {getAllPrimesBetweenTwoNumbersResultsOutput}
                                                    </tbody>
                                                </table>

                                            </div>

                                            
                                        </div>
                                        <div className="tab-pane fade" id="prospect-primes-between-two-numbers" role="tabpanel" aria-labelledby="prospect-primes-between-two-numbers">
                                            <form onSubmit={handleProspectPrimesBetweenTwoNumbers} className="form-horizontal form-label-left prospect-primes-between-two-numbers">
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="prospect_primes_between_two_numbers_apiKey">
                                                        apiKey
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="text" id="prospect_primes_between_two_numbers_apiKey" name="prospect_primes_between_two_numbers_apiKey" required="required" className="form-control  " defaultValue="123" />
                                                        <br />(Required) your API key
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="prospect_primes_between_two_numbers_start">
                                                        start
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="prospect_primes_between_two_numbers_start" name="prospect_primes_between_two_numbers_start" required="required" className="form-control " defaultValue="330" />
                                                        <br />(Required if the end is specified) the number from which the process will start (needs to be smaller than the end)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="prospect_primes_between_two_numbers_end">
                                                        end
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="prospect_primes_between_two_numbers_end" name="prospect_primes_between_two_numbers_end" required="required" className="form-control " defaultValue="1000" />
                                                        <br />(Required if the start is specified) the number to which the process will end (needs to be larger than the start)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Explanations</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                            <select id="prospect_primes_between_two_numbers_include_explanations" name="prospect_primes_between_two_numbers_include_explanations" className="select2_single form-control" tabIndex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full explanations for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Prime Types List</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                            <select id="prospect_primes_between_two_numbers_include_prime_types_list" name="prospect_primes_between_two_numbers_include_prime_types_list" className="select2_single form-control" tabIndex="-1" required="required">
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
                                                            <select id="prospect_primes_between_two_numbers_language" name="prospect_primes_between_two_numbers_language" className="select2_single form-control" tabIndex="-1" required="required">
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
                                                        {ProspectPrimesBetweenTwoNumbersResultsOutput}
                                                    </tbody>
                                                </table>

                                            </div>

                                            
                                        </div>
                                        <div className="tab-pane fade" id="get-isolated-random-prime" role="tabpanel" aria-labelledby="get-isolated-random-prime">
                                            <form onSubmit={handleGetIsolatedRandomPrime} className="form-horizontal form-label-left get-isolated-random-prime">
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get_isolated_random_prime_apiKey">
                                                        apiKey
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="text" id="get_isolated_random_prime_apiKey" name="get_isolated_random_prime_apiKey" required="required" className="form-control  " defaultValue="123" />
                                                        <br />(Required) your API key
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align" htmlFor="get_isolated_random_prime_minimum_combined_prime_gap">
                                                        Minimum Combined Prime Gap
                                                        <span className="required">*</span>
                                                        </label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                        <input type="number" id="get_isolated_random_prime_minimum_combined_prime_gap" name="get_isolated_random_prime_minimum_combined_prime_gap" required="required" className="form-control " defaultValue="200" />
                                                        <br />the total numbers of neighbouring composite numbers on the right and on the left of the current prime number, determines how isolated this prime is and how hard it is to find it (value between
                                                        200 and 500) (default is 200)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Explanations</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                            <select id="get_isolated_random_prime_include_explanations" name="get_isolated_random_prime_include_explanations" className="select2_single form-control" tabIndex="-1" required="required">
                                                            <option defaultValue="true">true</option>
                                                            <option defaultValue="false" selected>false</option>
                                                        </select>
                                                        <br />includes the full explanations for each item if true (default is false)
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-form-label col-md-3 col-sm-3 label-align">Include Prime Types List</label>
                                                    <div className="col-md-6 col-sm-6 ">
                                                            <select id="get_isolated_random_prime_include_prime_types_list" name="get_isolated_random_prime_include_prime_types_list" className="select2_single form-control" tabIndex="-1" required="required">
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
                                                            <select id="get_isolated_random_prime_language" name="get_isolated_random_prime_language" className="select2_single form-control" tabIndex="-1" required="required">
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
                                                        {GetIsolatedRandomPrimeResultsOutput}
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

import React, { Component } from 'react'

export default class ErrorHandler extends Component {
    render() {
        const content = this.props.content
        console.log(content)
        
        let errorMessage = "";

        for (let key in content) {
            console.log(content[key]);
            if (typeof content[key] == "object") {
                errorMessage += ` <strong>${content[key]}:  Something went wrong...</strong> ` 

                let errorComponent = `${errorMessage}`;

                return (
                    <div className="alert alert-danger alert-dismissible show-error error-is-this-number-prime" role="alert" dangerouslySetInnerHTML={{__html: errorComponent }} />
                )
                
            }  if (typeof content[key] == false) {
                errorMessage += "";
            }         
        }
        return (
            <>
            </>
        )
    }
}

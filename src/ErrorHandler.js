import React, { Component } from 'react'

export default class ErrorHandler extends Component {
    render() {
        const content = this.props.content
        console.log(content)

        let errorMessage = '';

        for (let key in content) {
            // console.log(typeof content[key]);
            if (typeof content[key] == "object") {
                errorMessage += `<div className="alert alert-danger alert-dismissible show-error error-is-this-number-prime" role="alert"> <button type="button" className="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">×</span> </button> <strong>${content}: ${content[key]}</strong> </div>`;
                
            }
        }
        return (
            <>
                {errorMessage}
            </>
        )
    }
}
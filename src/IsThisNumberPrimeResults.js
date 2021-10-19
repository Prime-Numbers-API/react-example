import React from 'react'

class IsThisNumberPrimeResults extends React.Component {


    is_this_number_prime_api_results_details(incomingData, parentKey) {

            // console.log(incomingData);

            //create an empty variable to store a new list item for each result
            let buildHtmlResults = '<table class="table">';
            let counter = 1;
            for (let key in incomingData) {

                buildHtmlResults += `<tr>`;
                buildHtmlResults += `<th scope="row">${counter}</th>`;
                buildHtmlResults += `<td>${key}</td>`;
                buildHtmlResults += `<td>${incomingData[key]}</td>`;
                buildHtmlResults += `</tr>`;

                counter++;
            }
            buildHtmlResults += '</table>';

            // console.log(buildHtmlResults);

            return buildHtmlResults;
        };

    render() {
        const content = this.props.content
        // console.log(content);
        let counter = 1;
        let buildHtmlResults = "";
        for (let key in content) {
            // console.log(typeof content[key]);
            if (typeof content[key] == "object") {
                buildHtmlResults += `<tr class="results-is-this-number-prime-${key}">`;
                buildHtmlResults += `<th scope="row">${counter}</th>`;
                buildHtmlResults += `<td>${key}</td>`;
                buildHtmlResults += `<td class="${key}">${this.is_this_number_prime_api_results_details(content[key], key)}</td>`;
                buildHtmlResults += `</tr>`;
            }
            else {
                buildHtmlResults += `<tr class="results-is-this-number-prime-${key}">`;
                buildHtmlResults += `<th scope="row">${counter}</th>`;
                buildHtmlResults += `<td>${key}</td>`;
                buildHtmlResults += `<td class="${key}">${content[key]}</td>`;
                buildHtmlResults += `</tr>`;
            }


            counter++;
        }

        
        return (
            <>
                <div dangerouslySetInnerHTML={{__html: buildHtmlResults }} />
            </>
        )
    }

}

export default IsThisNumberPrimeResults

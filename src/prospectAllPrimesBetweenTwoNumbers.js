import React from 'react'

class ProspectPrimesBetweenTwoNumbersResults extends React.Component {


    prospect_primes_between_two_numbers_api_results_details(incomingData, parentKey) {

            // console.log(incomingData);

            //create an empty variable to store a new list item for each result
            let buildHtmlResults = `<table class="table" key=${parentKey}>`;
            let counter = 1;
            

            
            for (let key in incomingData) {

                function secondLoop(nestedObject) {
                    let nestedCounter = 1; 
                    let htmlReturn = '';
                    for (let nestedKey in nestedObject) {
                        htmlReturn +=  `
                        <tr key=${nestedKey}>
                        <th scope="row">${nestedCounter++}</th>
                        <td>${nestedKey}</td>
                        <td>${nestedObject[nestedKey]}</td>
                        </tr>
                        `;
                    }
                    return (
                        `<table>${htmlReturn}</table>`
                    )
                }
                

                buildHtmlResults += `<tr>`;
                buildHtmlResults += `<th scope="row">${counter++}</th>`;
                buildHtmlResults += `<td>${key}</td>`;
                buildHtmlResults += `<td>${(typeof incomingData[key] == 'object') ? secondLoop(incomingData[key]) : incomingData[key]}</td>`;
                buildHtmlResults += `</tr>`;
                buildHtmlResults += `</tr>`;

            }
        
            buildHtmlResults += `</table>`;

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
                buildHtmlResults += `<tr class="results-prospect-primes-between-two-numbers-${key}">`;
                buildHtmlResults += `<th scope="row">${counter}</th>`;
                buildHtmlResults += `<td>${key}</td>`;
                buildHtmlResults += `<td class="${key}">${this.prospect_primes_between_two_numbers_api_results_details(content[key], key)}</td>`;
                buildHtmlResults += `</tr>`;
            }
            else {
                buildHtmlResults += `<tr class="results-prospect-primes-between-two-numbers-${key}">`;
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

export default ProspectPrimesBetweenTwoNumbersResults

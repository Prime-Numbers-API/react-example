import React from 'react'

class GetAllPrimesBetweenTwoNumbersResults extends React.Component {


    get_all_primes_between_two_numbers_api_results_details(incomingData, parentKey) {

            console.log(incomingData);

            //create an empty variable to store a new list item for each result
            let buildHtmlResults = `<table class="table" key=${parentKey}>`;
            let counter = 1;
            incomingData.map((key) => {
                console.log(key)

                //third loop for a double nested object
                function thirdLoop(doubleNestedObject) {
                    let doubleNestedCounter = 1; 
                    let htmlReturn = '';
                    for (let doubleNestedKey in doubleNestedObject) {
                        htmlReturn +=  `
                        <tr key=${doubleNestedKey}>
                        <th scope="row">${doubleNestedCounter++}</th>
                        <td>${doubleNestedKey}</td>
                        <td>${(typeof doubleNestedObject[doubleNestedKey] == 'object') ? thirdLoop(doubleNestedObject[doubleNestedKey]) : doubleNestedObject[doubleNestedKey]}</td>
                        </tr>
                        `;
                    }
                    return (
                        `<table>${htmlReturn}</table>`
                    )
                }

                //second loop for nested objects
                function secondLoop(nestedObject) {
                    let nestedCounter = 1; 
                    let htmlReturn = '';
                    for (let nestedKey in nestedObject) {
                        htmlReturn +=  `
                        <tr key=${nestedKey}>
                        <th scope="row">${nestedCounter++}</th>
                        <td>${nestedKey}</td>
                        <td>${(typeof nestedObject[nestedKey] == 'object') ? thirdLoop(nestedObject[nestedKey]) : nestedObject[nestedKey]}</td>
                        </tr>
                        `;
                    }
                    return (
                        `<table>${htmlReturn}</table>`
                    )
                }

                //map's return 
                return buildHtmlResults += 
                  `<tr>
                    <th scope="row">${counter++}</th>
                    <td>${(typeof key == 'object') ? secondLoop(key) : incomingData[key]}</td>
                    
                  </tr>`
            }) 
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
                buildHtmlResults += `<tr class="results-get-all-primes-between-two-numbers-${key}">`;
                buildHtmlResults += `<th scope="row">${counter}</th>`;
                buildHtmlResults += `<td>${key}</td>`;
                buildHtmlResults += `<td class="${key}">${this.get_all_primes_between_two_numbers_api_results_details(content[key], key)}</td>`;
                buildHtmlResults += `</tr>`;
            }
            else {
                buildHtmlResults += `<tr class="results-get-all-primes-between-two-numbers-${key}">`;
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

export default GetAllPrimesBetweenTwoNumbersResults

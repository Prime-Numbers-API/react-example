import React from 'react'
import SubObject from './SubObject';

class IsThisNumberPrimeResults extends React.Component {


    is_this_number_prime_api_results_details(incomingData, parentKey) {

            console.log(incomingData);

            //create an empty variable to store a new list item for each result
            let buildHtmlResults = `<table class="table" key=${parentKey}>`;
            let counter = 1;

            // Object.keys(incomingData).forEach(function (key) {
            //     if (typeof incomingData[key] === 'object') {
            //         return this.is_this_number_prime_api_results_details(incomingData[key])
            //     } else () {

            //     }
                // buildHtmlResults += `<tr>`;
                // buildHtmlResults += `<th scope="row">${counter}</th>`;
                // buildHtmlResults += `<td>${key}</td>`;
                // buildHtmlResults += `<td>${incomingData[key]}</td>`;
                // buildHtmlResults += `</tr>`;

                // counter++;
                // Object.values(key).forEach(key=> {
                //     buildHtmlResults += `<tr>`;
                //     buildHtmlResults += `<th scope="row">${counter}</th>`;
                //     buildHtmlResults += `<td>${key}</td>`;
                //     buildHtmlResults += `<td>${incomingData[key]}</td>`;
                //     buildHtmlResults += `</tr>`;

                //     counter++;
                // })
            // });

            

            for (let key in incomingData) {
                // console.log(typeof incomingData[key])
                console.log(incomingData[key])

                
                // if (typeof incomingData[key] == 'object') {

                //     buildHtmlResults += <SubObject key={key} values={incomingData[key]} />;
                    
                // } else {
                //     buildHtmlResults += `<tr key=${key}>`;
                //     buildHtmlResults += `<th scope="row">${counter}</th>`;
                //     buildHtmlResults += `<td>${key}</td>`;
                //     buildHtmlResults += `<td>${incomingData[key]}</td>`;
                //     buildHtmlResults += `</tr>`;
                // }

                //run same logic on nested loop
                function secondLoop(nestedObject) {
                    let nestedCounter = 1;
                    // let key = "";
                    // let keyValue = "";
                    let htmlReturn = '';
                    for (let nestedKey in nestedObject) {
                        console.log("nested Object: ", nestedObject)
                        console.log("nested Object Value: ", nestedObject[nestedKey])
                        console.log("number of nested loops: ", nestedCounter)
                        // key = nestedKey;
                        // keyValue = nestedObject[nestedKey];    
                        htmlReturn +=  `
                        <tr key=${nestedKey}>
                        <th scope="row">${nestedCounter++}</th>
                        <td>${nestedKey}</td>
                        <td>${nestedObject[nestedKey]}</td>
                        </tr>
                        `;
                        return (
                            `<table>${htmlReturn}</table>`
                        )
                    }
                }

                    buildHtmlResults += `<tr key=${key}>`;
                    buildHtmlResults += `<th scope="row">${counter++}</th>`;
                    buildHtmlResults += `<td>${key}</td>`; //base conversions key (contains an object)
                    //if base conversion's (key's) value is an object --> run a second loop with that object  
                    buildHtmlResults += `<td>${(typeof incomingData[key] == 'object') ? secondLoop(incomingData[key]) : incomingData[key]}</td>`;
                    buildHtmlResults += `</tr>`;
                
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

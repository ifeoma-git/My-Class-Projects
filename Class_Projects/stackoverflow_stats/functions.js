/**
 * Build row data to be shown in a table
 *
 * @param {object} yearlyTechStats Year by year stats of technologies mentioned in StackOverflow
 * @param {Array<string>} selectedTechs Technologies selected
 * @param {number} firstYear First year of data selected
 * @param {number} lastYear Last year of data selected
 * @returns {Array<string|number>}
 */
function buildRowData (yearlyTechStats, selectedTechs, firstYear, lastYear) {
  // TODO: Write your code here
    // Initialize an array to store the row data
    let rowData = [];

    // Loop through the selected technologies
    selectedTechs.forEach(tech => {
        // Initialize an array for each technology to store the row data
        let row = [tech];

        // Loop through the years
        for (let year = firstYear; year <= lastYear; year++) {
            // Check if yearlyTechStats contains data for the current year and technology
            if (yearlyTechStats[year] && yearlyTechStats[year][tech]) {
                // If data exists, push the number of mentions for the current year and technology
                row.push(yearlyTechStats[year][tech]);
            } else {
                // If data doesn't exist, push 0
                row.push(0);
            }
        }

        // Push the row data to the main rowData array
        rowData.push(row);
    });

    return rowData;
}

/**
 * Get HTML of table rows
 *
 * @param {Array<string|number>} rowData
 * @returns {string} HTML of the table rows
 */
function constructTableRowsHtml (rowData) {
  // TODO: Write your code here
    // Initialize an empty string to store the HTML
    let html = '';

    // Loop through each row data array
    rowData.forEach(row => {
        // Open a table row tag
        html += '<tr>';

        // Loop through each item in the row array
        row.forEach(item => {
            // Add a table data tag with the item's value
            html += '<td>' + item + '</td>';
        });

        // Close the table row tag
        html += '</tr>';
    });

    // Return the constructed HTML
    return html;
}

/**
 * Get HTML of table heading row
 *
 * @param {Array<string|number>} headings Table headings
 * @returns {string} HTML of the heading row
 */
function constructTableHeadHtml (headings) {
  // TODO: Write your code here
    // Initialize an empty string to store the HTML
    let html = '<tr>';

    // Loop through each heading in the headings array
    headings.forEach(heading => {
        // Add a table heading tag with the heading's value
        html += '<th>' + heading + '</th>';
    });

    // Close the table row tag
    html += '</tr>';

    // Return the constructed HTML
    return html;
}

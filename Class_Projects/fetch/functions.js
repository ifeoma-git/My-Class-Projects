/**
 * Build yearly technology stats
 *
 * @param {object} techStats StackOverfow stats
 * @returns {object} Year by year stats of technologies mentioned in StackOverflow
 */
function buildYearlyTechStats (techStats) {
  // TODO: Write your code here
    // Initialize an object to store the yearly technology statistics
    let yearlyStats = {};

    // Loop through each year in the techStats object
    for (let year in techStats) {
        // Check if the year is not a prototype property
        if (techStats.hasOwnProperty(year)) {
            // Initialize an object to store the yearly stats for the current year
            yearlyStats[year] = {};

            // Loop through each technology in the current year's stats
            for (let tech in techStats[year]) {
                    // Add the technology and its count to the yearly stats
                    yearlyStats[year][tech] = techStats[year][tech];
                }
            }
        }
    // Return the yearly technology statistics
    return yearlyStats;
}

/**
 * Update table contents
 *
 * @param {HTMLTableElement} table DOM element for the table
 * @param {object} yearlyTechStats Year by year stats of technologies mentioned in StackOverflow
 * @param {Array<string>} selectedTechs Technologies selected
 * @param {number} firstYear First year of data selected
 * @param {number} lastYear Last year of data selected
 */
function updateTable (table, yearlyTechStats, selectedTechs, firstYear, lastYear) {
  // TODO: Write your code here
    // Get the table head element
    let tableHead = table.querySelector('thead');

    // Get the table body element
    let tableBody = table.querySelector('tbody');

    // Get the table headings for the selected years
    let headings = ['Technology'];
    for (let year = firstYear; year <= lastYear; year++) {
        headings.push(year);
    }

    // Construct the table head HTML
    let tableHeadHtml = constructTableHeadHtml(headings);

    // Construct the row data for the selected technologies
    let rowData = buildRowData(yearlyTechStats, selectedTechs, firstYear, lastYear);

    // Construct the table rows HTML
    let tableRowsHtml = constructTableRowsHtml(rowData);

    // Update the table head HTML
    tableHead.innerHTML = tableHeadHtml;

    // Update the table body HTML
    tableBody.innerHTML = tableRowsHtml;
}

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
  // TODO: Copy code from previous exercise
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
  // TODO: Copy code from previous exercise
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
  // TODO: Copy code from previous exercise
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

  /**
   * async function getJSON(url)
   */
  async function getJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Error fetching JSON:', error);
      throw error;
    }
  }

  /**
   * async function getStackOverflowData (apiUrl, technologies = null)
   */
  async function getStackOverflowData(apiUrl, technologies = null) {
    // If technologies array is provided and not empty, build the query string
    let queryString = '';
    if (technologies && technologies.length > 0) {
      const encodedTechnologies = technologies.map(tech => encodeURIComponent(tech)).join(';');
      queryString = `?tech=${encodedTechnologies}`;
    }
  
    // Append the query string to the apiUrl
    const url = apiUrl + queryString;
  
    // Fetch data using the getJSON function
    try {
      const jsonData = await getJSON(url);
      return jsonData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
}
/**
 * Copy following functions from previous exercise:
 *   - constructTableRowsHtml() 
 *   - constructTableHeadHtml()
 * 
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
 * Get publications classified by year
 *
 * @param {*} publicationsData Original publications JSON data
 * @returns {object} Publications by year, each publication containing title, year, and authors
 */
const getPublications = publicationsData => {
  // TODO: Implement this function
    const publicationsByYear = {};
    
    // Iterate over each publication in the data
    publicationsData.publication.forEach(publication => {
      const year = publication.year;
  
      // Skip publications with no authors
      if (!publication.authors || publication.authors.length === 0) {
        return;
      }
  
      // Ensure authors is an array
      const authors = Array.isArray(publication.authors) ? publication.authors : [publication.authors];
  
      // Construct publication object
      const publicationObj = {
        title: publication.title,
        authors: authors,
        year: year
      };
  
      // Add publication to corresponding year array
      if (!publicationsByYear[year]) {
        publicationsByYear[year] = [];
      }
      publicationsByYear[year].push(publicationObj);
    });
  
    return publicationsByYear;
  };
/**
 * Get sorted list of unique years from publications
 *
 * @param {object} publications
 * @returns {Array<number>} unique years sorted in ascending order
 */
const getYears = publications => {
  // TODO: Implement this function
    // Get all the keys (years) from the publications object
    const years = Object.keys(publications);
    
    // Remove duplicate years by converting the array to a Set and back to an array
    const uniqueYears = Array.from(new Set(years));
    
    // Sort the array of unique years in ascending order
    uniqueYears.sort((a, b) => a - b);
    
    return uniqueYears;
  };

/**
 * Fill options list of select with years
 *
 * @param {Array} years
 */
const fillOptionList = years => {
  // TODO: Implement this function
    const selectElement = document.getElementById("year-select");
    selectElement.innerHTML = ""; // Clear existing options
    
    // Create and append options for each year
    years.forEach(year => {
      const optionElement = document.createElement("option");
      optionElement.value = year;
      optionElement.textContent = year;
      selectElement.appendChild(optionElement);
    });
    
    // Add an option for selecting all years
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.textContent = "All";
    selectElement.appendChild(allOption);
  };

/**
 * Construct publication row data suitable for constructTableRowsHtml()
 *
 * @param {object} publications publications classified by year
 * @param {Array<number>} years years which should be included in the data
 * @returns {Array} rowData
 */
const constructPublicationRowData = (publications, years) => {
  // TODO: Implement this function
    const rowData = [];
  
    years.forEach(year => {
      if (publications.hasOwnProperty(year)) {
        publications[year].forEach(publication => {
          const row = [];
          row.push(publication.year);
          row.push(publication.title);
          
          // Check if the publication has authors
          if (publication.authors.length > 0) {
            const firstAuthor = publication.authors[0].text;
            row.push(firstAuthor);
  
            // If there are more than one author, concatenate their names
            if (publication.authors.length > 1) {
              const restAuthors = publication.authors.slice(1).map(author => author.text).join(", ");
              row.push(restAuthors);
            } else {
              row.push("");
            }
          } else {
            row.push("");
            row.push("");
          }
  
          rowData.push(row);
        });
      }
    });
  
    return rowData;
  };

/**
 * Construct HTML for publications table based on selected year or all
 * publications if year is not given
 *
 * @param {object} publications publications classified by year
 * @param {number|null} year The selected year
 * @returns {string} table HTML
 */
const constructPublicationsTableHtml = (publications, year = null) => {
    // Get the years to be included in the table
    const years = year ? [year] : Object.keys(publications);
  
    // Construct table head HTML
    const headings = ["Year", "Title", "The 1st author", "Co-authors"];
    const tableHeadHtml = constructTableHeadHtml(headings);
  
    // Construct table body HTML
    const tableBodyHtml = years.reduce((html, year) => {
      const rowData = constructPublicationRowData(publications, [year]);
      return html + constructTableRowsHtml(rowData);
    }, "");
};

/**
 * Initialize the application
 * (load all needed data, update DOM, attach event handlers)
 *
 * - get publications
 * - get years
 * - fill select options
 * - set table to show publications from the first year in the list
 * - on form submit update table based on the selection
 */
const init = () => {
  // TODO: Implement this function
    // Get publications data
    const publicationsData = getPublications(publicationsData);

    // Get years from publications
    const years = getYears(publicationsData);

    // Fill select options
    fillOptionList(years);

    // Set table to show publications from the first year in the select list (2009)
    const defaultYear = years[0];
    const tableHtml = constructPublicationsTableHtml(publicationsData, defaultYear);
    const container = document.getElementById('container');
    container.innerHTML = tableHtml;

    // Attach event handler on the form submit to update the table based on the selection
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedYear = form.year.value;
        const updatedTableHtml = constructPublicationsTableHtml(publicationsData, selectedYear);
        container.innerHTML = updatedTableHtml;
    });
};

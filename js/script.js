/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

const studentsLI = document.querySelector("ul.student-list").children;
const itemsPerPage = 10;

/**
 * show one page of the pagination with `itemsPerPage` items.
 *
 * @param  {array}  list the list of all the item who needs pagination
 * @param  {number} page the number of the page who have to be displayed
 */
function showPage(list, page) {
    const start = (page * itemsPerPage) - itemsPerPage;
    const end = page * itemsPerPage;
    // Hide all elements except the needed ones
    for (let i = 0 ; i < list.length ; i += 1) {
        const li = list[i];
        if (i >= start && i < end) {
            li.style.display = "";
        } else {
            li.style.display = "none";
        };
    };
};

/**
 * add the links use to navigate through pagination
 *
 * @param  {array} list the list of all the item who needs pagination
 */
function appendPageLinks(list) {
    /**
     * highlight the right navigation link and show the right page
     *
     * @param  {Event} event the event associated to the clicked link 
     */
    function selectAPage(event) {
        const page = event.target.textContent;
        const pageLinks = document.querySelectorAll("div.pagination a");
        for ( i = 0 ; i < pageLinks.length ; i += 1) {
            pageLinks[i].className = "";
        };
        event.target.className = "active";
        showPage(list, page);
    };
    /**
     * create a LI element containing a link to one page
     *
     * @param  {number} page the number of the page associated to this link
     */
    function createLinkLI(page) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = page;
        a.addEventListener("click", selectAPage);
        li.appendChild(a);
        return li;
    };
    const numberOfPage = Math.ceil(list.length/itemsPerPage);
    const divPage = document.querySelector("div.page");
    const divPagination = document.createElement("div");
    divPagination.className = "pagination";
    divPage.appendChild(divPagination);
    // Do pagination links only if they are at least 2 pages.
    if (numberOfPage >= 2) {
        const ul = document.createElement("ul");
        // create the navigation links
        for (let i = 1 ; i <= numberOfPage ; i += 1)  {
            const li = createLinkLI(i);
            ul.appendChild(li);
        };
        divPagination.appendChild(ul);
        // show the page 1 and highlight the right link
        showPage(list, 1);
        ul.firstElementChild.firstElementChild.className = "active";
    };
};

// show the page links and then the page 1 of the results
appendPageLinks(studentsLI)
showPage(studentsLI, 1)

// The code below is for the Exceed-Expectation

/**
 * create a `p` containing the message in case there is no results.
 */
function appendNoResultMessage() {
    const divPage = document.querySelector("div.page");
    const p = document.createElement("p");
    p.textContent = "No results!";
    p.style.textAlign = "center";
    p.style.color = "red";
    p.style.display = "none";
    p.className = "noResultMessage"
    divPage.appendChild(p)
}

/**
 * show the message for no results
 */
function showNoResultMessage() {
    const p = document.querySelector("p.noResultMessage");
    p.style.display = "";
}

/**
 * hide the message for no results
 */
function hideNoResultMessage() {
    const p = document.querySelector("p.noResultMessage");
    p.style.display = "none";
}

/**
 * create the search bar to search students
 */
function appendSearchBar() {
    const divHeader = document.querySelector("div.page-header");
    const divSearchBar = document.createElement("div");
    divSearchBar.className = "student-search";
    const input = document.createElement("input");
    input.placeholder = "Search for students...";
    input.addEventListener('keyup', (event) => {
        studentNameRequest(studentsLI, input.value);
    });
    const button = document.createElement("button");
    button.textContent = "Search";
    button.addEventListener('click', (event) => {
        studentNameRequest(studentsLI, input.value);
    });
    divSearchBar.appendChild(input);
    divSearchBar.appendChild(button);
    divHeader.appendChild(divSearchBar);
};

/**
 * Select students who have a name containing the string `text`
 *
 * @param  {array}  list         the list of students to be filtered
 * @param  {string} text         the text to be search in the names of the students
 *
 * @return {array}  searchResult the list of student who have a name containing the string `text`
 */
function searchStudent(list, text) {
    const searchResult = [];
    for (let i = 0 ; i < list.length ; i += 1) {
        const li = list[i];
        const h = li.querySelector("h3");
        const name = h.textContent;
        if (name.search(text) > -1) {
            searchResult.push(li);
        } else {
            li.style.display = 'none';
        };
    };
    return searchResult
};

/**
 * 
 * Show the requested students and update the pagination's links
 *
 * @param  {array}  list the list of students to be filtered
 * @param  {string} text the text to be search in the names of the students
 */
function studentNameRequest(list, text) {
    const searchResult = searchStudent(list, text);
    const divPagination = document.querySelector("div.pagination");
    divPagination.parentNode.removeChild(divPagination);
    if (searchResult.length > 0) {
        appendPageLinks(searchResult)
        showPage(searchResult, 1)
        hideNoResultMessage()
    } else {
        showNoResultMessage()
        appendPageLinks([])
    };
};


// show the search bar and append the message for no results in search.
appendSearchBar()
appendNoResultMessage()

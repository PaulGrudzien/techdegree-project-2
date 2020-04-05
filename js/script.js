/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

const studentsLI = document.querySelector("ul.student-list").children;
const itemsPerPage = 10;

/**
 * show one page of the pagination with itemsPerPage items.
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
 * add the links use to navigate thru pagination
 *
 * @param  {array} list the list of all the item who needs pagination
 */
function appendPageLinks(list) {
    /**
     * highlight the right navigation link and show the right page
     *
     * @param  {Event} event the clicked link 
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
    // Do pagination links only if they are at least 2 pages.
    const numberOfPage = Math.ceil(list.length/itemsPerPage);
    if (numberOfPage >= 2) {
        const divPage = document.querySelector("div.page");
        const divPagination = document.createElement("div");
        divPagination.className = "pagination";
        const ul = document.createElement("ul");
        // create the navigation links
        for (let i = 1 ; i <= numberOfPage ; i += 1)  {
            const li = createLinkLI(i);
            ul.appendChild(li);
        };
        divPagination.appendChild(ul);
        divPage.appendChild(divPagination);
        // show the page 1 and highlight the right link
        showPage(list, 1);
        ul.firstElementChild.firstElementChild.className = "active";
    };
};

// show the page links and then the page 1 of the results
appendPageLinks(studentsLI)
showPage(studentsLI, 1)

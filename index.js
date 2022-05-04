let myLinks = []
let myIDs = []
const inputID = document.getElementById("input-el1")
const inputLink = document.getElementById("input-el2")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const IDsFromLocalStorage = JSON.parse( localStorage.getItem("myIDs") )
const LinksFromLocalStorage = JSON.parse( localStorage.getItem("myLinks") )
const tabBtn = document.getElementById("tab-btn")

if (LinksFromLocalStorage && IDsFromLocalStorage) {
    myLinks = LinksFromLocalStorage
    myIDs = IDsFromLocalStorage
    render(myIDs, myLinks)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLinks.push(tabs[0].url)
        myIDs.push(tabs[0].url)
        localStorage.setItem("myLinks", JSON.stringify(myLinks) )
        localStorage.setItem("myIDs", JSON.stringify(myIDs) )
        render(myIDs, myLinks)
    })
})

function render(id, link) {
    let listItems = ""
    for (let i = 0; i < link.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${link[i]}'>
                    ${id[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLinks = []
    myIDs = []
    render(myIDs, myLinks)
})

inputBtn.addEventListener("click", function() {
    if (inputLink.value != ""){
        myLinks.push(inputLink.value)
        if (inputID.value != "")    myIDs.push(inputID.value)
        else    myIDs.push(inputLink.value)
        inputID.value = ""
        inputLink.value = ""
        localStorage.setItem("myLinks", JSON.stringify(myLinks) )
        localStorage.setItem("myIDs", JSON.stringify(myIDs) )
        render(myIDs, myLinks)
    }
})
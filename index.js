let myLeads = []
const inputEl = document.getElementById("input-el") /* const is also used for declaring a variable, diff. between let and const is that the value assigned using const can't be changed. Const for constant*/ 
let inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
    
    // Save the url instead of logging it out
    // console.log(tabs[0].url)
    
})

function render(leads){
    let listItems = ""
    for(let i = 0; i < leads.length; i++){
        //listItems += "<li><a target = '_blank' href ='" + myLeads[i] + "'>" + myLeads[i] + "</a> </li>"
        //rewriting the above line using template string
        //template strings are used to break a super long string into multiple lines
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value) /* to push the value entered in the input field into the array*/
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    //localStorage.getItem("myLeads")
    render(myLeads)
})

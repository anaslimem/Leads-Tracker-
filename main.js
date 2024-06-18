let myleads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deletebtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("unordered");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"));
const savebtn = document.getElementById("save-btn");
if(leadsFromLocalStorage) {
myleads=leadsFromLocalStorage
render(myleads);
}

savebtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myleads.push(tabs[0].url);
        localStorage.setItem("myleads", JSON.stringify(myleads));
        render(myleads);
    })

})
inputBtn.addEventListener("click", function(){
    myleads.push(inputEl.value);
    inputEl.value = ""
    localStorage.setItem("myleads", JSON.stringify(myleads));
    render(myleads); 
})
deletebtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myleads = [];
    render(myleads);
})
function render(leads){
    let listItems = "" 
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href = '${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
    `
    }
    ulEl.innerHTML = listItems
}


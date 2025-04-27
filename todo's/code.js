let entries = []
let eindex = -1 ;

function addenty(){
    let desc = document.querySelector(".description").value;
    let amount = parseInt(document.querySelector(".amount").value);
    let type = document.querySelector(".what-type").value;

    if(!desc || amount <=0 ){
        alert("Please enter valid input!");
        return
    }

    const entry = {desc, amount, type};


    if(eindex > -1 ){
        entries[eindex] = entry;
        eindex = -1;
    }else {
        entries.push(entry) 
    }

    renderEntries();
    resetall();
}

function resetall(){
    document.querySelector(".description").value = "";
    document.querySelector(".amount").value = "";
    document.querySelector(".what-type").value = "";
}


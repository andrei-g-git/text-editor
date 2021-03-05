

function onClickSave(quillEditor){
    var delta = quillEditor.getContents();

    var title = document
        .getElementById("title-field")
        .value;

    var dateMonthYear = dayMonthYear();

    var titleDateAndContent = {
        title,
        dateMonthYear,
        ...delta
    }

    //MERGE WITH UPLLADED OLD POSTS
    var oldPosts = JSON.parse(
        localStorage.getItem("oldPosts")
    );

    oldPosts.push(titleDateAndContent);

    var data = JSON.stringify(oldPosts); //works with null?



    const file = new Blob(
        [data],
        { type: "application/json" }
    );

    const fileUrl = URL.createObjectURL(file);                    

    var downloadLink = document
        .getElementById("save-button-link")
        .setAttribute('href', fileUrl);  



    return downloadLink; //this will return undefined because none of this shit actually finalizes here, jsx and all
}

function dayMonthYear(){
    var day = new Date().getUTCDate().toString();
    var monthIndexFromZero = new Date().getUTCMonth();
    var monthName = getMonthName(monthIndexFromZero);
    var fullYear = new Date().getUTCFullYear().toString();

    return day.toString() + "/" + monthName+ "/" + fullYear.toString();
}

function getMonthName(monthIndexFromZero){
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return monthNames[monthIndexFromZero];
}

function mergePostFiles(path){

}

//no go
// function resolveAfter50miliseconds() {
//     return new Promise(resolve => {
//         setTimeout(() => { 
//             resolve("whatever");
//         }, 50);        
//     });
// }

// async function simulateClickOnLink(link){
//     await resolveAfter50miliseconds();

//     link.click();
// }




export {
    onClickSave
};
class FormController{

    onClickSave(quillEditor){
        var delta = quillEditor.getContents();

        var title = document
            .getElementById("title-field")
            .value;

        var dayMonthYear = this.dayMonthYear();

        var titleDateAndContent = {
            title,
            dayMonthYear,
            ...delta
        }

        var posts = this.mergeWithPostsFromLocalStorage(titleDateAndContent);

        var data = JSON.stringify(posts); //works with null?

        var fileUrl = this.createFileUrl(data);
        var downloadLink = document
            .getElementById("save-button-link")
            .setAttribute('href', fileUrl);  
    }

    dayMonthYear(){
        var day = new Date().getUTCDate().toString();
        var monthIndexFromZero = new Date().getUTCMonth();
        var monthName = this.getMonthName(monthIndexFromZero);
        var fullYear = new Date().getUTCFullYear().toString();

        return day.toString() + "/" + monthName+ "/" + fullYear.toString();
    }

    getMonthName(monthIndexFromZero){
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return monthNames[monthIndexFromZero];
    }

    mergeWithPostsFromLocalStorage(titleDateAndContent){
        var oldPosts = JSON.parse(
            localStorage.getItem("oldPosts")
        );

        oldPosts.push(titleDateAndContent);

        return oldPosts;
    }

    createFileUrl(data){
        const file = new Blob(
            [data],
            { type: "application/json" }
        );

        const fileUrl = URL.createObjectURL(file);      

        return fileUrl;
    }
}

export default FormController;
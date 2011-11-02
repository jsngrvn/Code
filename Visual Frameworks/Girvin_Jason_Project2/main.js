// Jason Girvin
// Week 2 - Project 2
// Visual Frameworks
// 11/1/2011

//wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){





    //getElementById Function
    function $(x){
        var formData = document.getElementById("x");
        return formData;
    };
    
    
    
    //variable defaults
    var timeofTest = ["--Time of Test--", "Morning", "Afternoon", "Evening"];
    
    
    
    //set link & click events (setting up buttons)
    var displayData = $("displayData");
    displayData.addEventListener("click", getData);

    var clearData = $("clear");
    clearData.addEventListener("click", clearLocal);

    var save = $("submit");
    save.addEventListener("click", storedata);
});
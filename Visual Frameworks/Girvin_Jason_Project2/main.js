// Jason Girvin
// Week 2 - Project 2
// Visual Frameworks
// 11/1/2011

//wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){



    //getElementById Function
    function $(x){
        var formData = document.getElementById(x);
        return formData;
    };
    
    
    //create select field element pop with options
    function makeCats(){
        var formTag = document.getElementsByTagName("form"), //formtag is an array of all tags.
            selectLi = $('select'),
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "groups");
        for (var i=0, j=timeofTest.length; i<j; i++){
            var makeOption = document.createElement('option');
            var optText = timeofTest[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    };

    
    //variable defaults
    var timeofTest = ["--Time of Test--", "Morning", "Afternoon", "Evening"];
    makeCats();
    
/*    
    //set link & click events (setting up buttons)
    var displayData = $("displayData");
    displayData.addEventListener("click", getData);

    var clearData = $("clear");
    clearData.addEventListener("click", clearLocal);

    var save = $("submit");
    save.addEventListener("click", storedata);
    
*/
});
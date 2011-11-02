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
    
    //find value of selected radio button
    function getSelectedRadio(){
        var radio = document.forms[0].insulin;
        for (var i=0; i<radio.length; i++){
            if(radios[i].checked){
                inslulinValue = radios[i].value;    
                }
            }
        };


    function storeData(){
        var id = Math.floor(Math.random()*1000001);
        //retrieve form field values and store locally in an object
        //objects properties contain an array which includes form label and inputs
        getSelectedRadio();
        var item = {};
            item.testDate = ["Test Date:", $('testDate').value];
            item.select   = ["Time of Test:", $('select').value];
            item.points   = ["Score:", $('points').value];   
            item.checkbox = ["Insulin Taken:", insulinValue];
            item.insunits = ["Units Taken:", $('insunits').value];
            item.addlinfo = ["Additional Info:", $('addlinfo').value];
        //save data to local storage: Use stringify to convert objects to string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Saved testing event!");
        
        
        };

    
    //variable defaults
    var timeofTest = ["--Time of Test--", "Morning", "Afternoon", "Evening"],
        inslulinValue;
    makeCats();
    
   
/*    //set link & click events (setting up buttons)
    var displayData = $("displayData");
    displayData.addEventListener("click", getData);

    var clearData = $("clear");
    clearData.addEventListener("click", clearLocal);
*/
    var save = $('submit');
    save.addEventListener("click", storeData);
    

});
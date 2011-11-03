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
        var radios = document.forms[0].insulin;
        for (var i=0; i<radios.length; i++){
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
            item.score    = ["Score:", $('score').value];   
            item.checkbox = ["Insulin Taken:", insulinValue];
            item.insunits = ["Units Taken:", $('insunits').value];
            item.addlinfo = ["Additional Info:", $('addlinfo').value];
        //save data to local storage: Use stringify to convert objects to string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Saved testing event!");
        	
        
        };

    function getData(){
        //write data from local to screen
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        for (var i=0, len=localStorage.length; i<len; i++){
            var makeli = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert string from local storage back into a object by JSON parse
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
            for (var n in obj){
                var makeSubLi = document.createElement('li');
                makeSubList.appendChild(makeSubLi);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubLi.innerHTML = optSubText;
                }
            }
        
        };
    
    
    //variable defaults
    var    timeofTest = ["--Time of Test--", "Morning", "Afternoon", "Evening"];
    var    insulinValue;
    makeCats();
    
   
    //set link & click events (setting up buttons)
    var displayData = $("displayData");
    displayData.addEventListener("click", getData);
/*
    var clearData = $("clear");
    clearData.addEventListener("click", clearLocal);
*/
    var save = $('submit');
    save.addEventListener("click", storeData);
    

});
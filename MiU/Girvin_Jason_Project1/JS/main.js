// Jason Girvin
// Week 4 - Project 4
// Visual Frameworks
// 11/17/2011

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
                return (radios[i].value);
                }
            }
        };
        
    function toggleControls(n){
        switch(n){
            case "on":
                $('formData').style.display = "none";
                $('clearData').style.display = "inline";
                $('displayData').style.display = "none";
                $('addNew').style.display = "inline";
                $('submit').style.display = "none";
                break;
            case "off":
                $('formData').style.display = "block";
                $('clearData').style.display = "inline";
                $('displayData').style.display = "inline";
                $('addNew').style.display = "none";
                $('items').style.display = "none";
                $('submit').style.display = "inline";
                break;
            default:
                return false;
        }
    }


    function storeData(key){
        //if no key, brand new and needs key
	if(!key){
	    var id 		  = Math.floor(Math.random()*1000001);
	}else{
	    //set id to existing key, saves over previously saved data
	    //this key is same as passed previously from edit submit event handler
	    //to validate then passed into storedData
	    id = key;
	}
        //retrieve form field values and store locally in an object
        //objects properties contain an array which includes form label and inputs
        //getSelectedRadio();
        var item = {};
            item.testDate = ["Test Date:", $('testDate').value];
            item.select   = ["Time of Test:", $('groups').value];
            item.tscore   = ["Score:", $('tscore').value];   
            item.radios   = ["Insulin Taken:", getSelectedRadio()];
            item.insunits = ["Units Taken:", $('insunits').value];
            item.addlinfo = ["Additional Info:", $('addlinfo').value];
        //save data to local storage: Use stringify to convert objects to string
        localStorage.setItem(id, JSON.stringify(item));
        alert("Saved testing event!");
        	
        
        };

    function getData(){
        toggleControls("on");
        if (localStorage.length === 0){
	    autoFillData();
            alert("There is no data to display, so default data was added!");
        }
        //write data from local to screen
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $('items').style.display = "block";
        for (var i=0, len=localStorage.length; i<len; i++){
            var makeli = document.createElement('li');
	    var linksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert string from local storage back into a object by JSON parse
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
	    getImage(obj.select[1], makeSubList);
            for (var n in obj){
                var makeSubLi = document.createElement('li');
                makeSubList.appendChild(makeSubLi);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubLi.innerHTML = optSubText;
	        makeSubList.appendChild(linksLi);
		}
	    makeItemLinks(localStorage.key(i), linksLi); //creates edit and delete links for items in local storage
            }
        
        };
	
    //get image based on select
    function getImage(imgName, makeSubList){
	var imageLi = document.createElement('li');
	makeSubList.appendChild(imageLi);
	var newImage = document.createElement('img');
	var setSrc = newImage.setAttribute("src", "images/"+ imgName +".png");
	imageLi.appendChild(newImage);
    }
    
    
    //JSON object to autopopulate data in local storage
    function autoFillData(){
	var json = {
	    "score1":{
		"testDate": ["Test Date:", "04-01-2011"],
		"select"  : ["Time of Test:", "Morning"],
		"tscore"  : ["Score:", "150"],
		"radios"  : ["Insulin Taken:", "Humalog"],
		"insunits": ["Units Taken:", "35"],
		"addlinfo": ["Additional Info:", "Nothing to see here but a test score!"]
		},
		
	    "score2":{
		"testDate": ["Test Date:", "04-30-2011"],
		"select"  : ["Time of Test:", "Evening"],
		"tscore"  : ["Score:", "100"],
		"radios"  : ["Insulin Taken:", "Lantus"],
		"insunits": ["Units Taken:", "12"],
		"addlinfo": ["Additional Info:", "Still nothing, keep moving..."]
		},
		
	    "score3":{
		"testDate": ["Test Date:", "05-3-2011"],
		"select"  : ["Time of Test:", "Afternoon"],
		"tscore"  : ["Score:", "88"],
		"radios"  : ["Insulin Taken:", "Novalog"],
		"insunits": ["Units Taken:", "101"],
		"addlinfo": ["Additional info:", "Now I am just showing off."]
		}
	    
	    };
		
	//store JSON object into local storage
	for(var n in json){
	    var id		= Math.floor(Math.random()*10000001);
	    localStorage.setItem(id, JSON.stringify(json[n]));
	    };
	};
	
    function editItem(){
	//get data from item in local storage
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);
	
	//show form
	toggleControls("off");
	
	//pop. form fields with current LS values
	$('testDate').value = item.testDate[1];
	$('groups').value = item.select[1];
	$('tscore').value = item.tscore[1];
	//var radios = document.forms[0].radios;
	var radios = document.getElementsByName("insulin");
	for(var i=0; i<radios.length; i++){
	    if(radios[i].value == "Humalog" && item.radios[1] == "Humalog"){
		radios[i].setAttribute("checked", "checked");
	    }else if(radios[i].value == "Lantus" && item.radios[1] == "Lantus"){
		radios[i].setAttribute("checked", "checked");
	    }else if(radios[i].value == "Novalog" && item.radios[1] == "Novalog"){
		radios[i].setAttribute("checked", "checked");
	    }; 
	}
	$('insunits').value = item.insunits[1];
	$('addlinfo').value = item.addlinfo[1];
	
	// remove the initial listener from the input "save score" button
	save.removeEventListener("click", storeData);
	//change submit button value to say edit
	$('submit').value = "Edit Score";
	var editSubmit = $('submit');
	//save key value established in this function as a prop. of the editSubmit event
	//ability to use that value when saving edited data
	editSubmit.addEventListener("click", validate);
	editSubmit.key = this.key;
    }
    
    //make item links
    //creates edit and delete options for links in local storage
    function makeItemLinks(key, linksLi){
	//edit single item link
	var editLink = document.createElement('a');
	editLink.href = "#";
	editLink.key = key;
	var editText = "Edit Score";
	editLink.addEventListener("click", editItem);
	editLink.innerHTML = editText;
	linksLi.appendChild(editLink);
	
	//creates a break but I am intentionally leaving out, I have them seperated in CSS
	//add link break
	//var breakTag = document.createElement('br');
	//linksLi.appendChild(breakTag);
	
	//add delete
	var deleteLink = document.createElement('a');
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete Score";
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);
    };
    
    function deleteItem(){
	var ask = confirm("Are you certain you want to delete the Score?");
	if(ask){
	    localStorage.removeItem(this.key);
	    alert("Score has been deleted!");
	    window.location.reload();
	}else{
	    alert("The Score has not been Deleted!");
	}
    };
    
    
    function clearLocal(){
        if(localStorage.length === 0){
            alert("There is no data to clear.");
        }else{
            localStorage.clear();
            alert("All test scores have been deleted.");
            window.location.reload();
            return false;
        }
        
    };
    
    function validate(e){
    	//define elements I want to validate
	var getSelect = $('groups');
	var getInsunits = $('insunits');
	
	//reset error messages
	errMsg.innerHTML = "";
	getSelect.style.border = "1px solid grey";
	getInsunits.style.border = "1px solid grey";
	
	//get error messages
	var messageAry = [];
	// time validation
	if(getSelect.value === "--Time of Test--"){
	    var selectError = "Please select a Time.";
	    getSelect.style.border = "1px solid red";
	    messageAry.push(selectError);
	}
	if(getInsunits.value === ""){
	    var insunitsError = "Please enter the number of Units.";
	    getInsunits.style.border = "1px solid red";
	    messageAry.push(insunitsError);
	}
	
	if(messageAry.length >= 1){
	    for(var i = 0, j = messageAry.length; i < j; i++){
		var txt = document.createElement('li');
		txt.innerHTML = messageAry[i];
		errMsg.appendChild(txt);
	    }
	    e.preventDefault();
	    return false;
	}else{
	    //if good save data, send key value (came from editData)
	    //key value was passed through nearly every function as a prop.
	    storeData(this.key);
	};
    };
    
    
    //variable defaults
    var    timeofTest = ["--Time of Test--", "Morning", "Afternoon", "Evening"];
    var    insulinValue;
    var    errMsg = $('errors');
    makeCats();
    
   
    //set link & click events (setting up buttons)
    var displayData = $('displayData');
    displayData.addEventListener("click", getData);

    var clearLink = $('clearData');
    clearData.addEventListener("click", clearLocal);

    var save = $('submit');
    save.addEventListener("click", validate);
    

});
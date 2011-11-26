//alert("JavaScript works!");

//Jason Girvin
//10/11/2011
//SDI -Project 3
//1110


//defining variable and objects
var name = "Abbigail",
    dayOfWeekScores = {
                       days: ["Thursday", "Friday", "Saturday"],
                       mornScores: [ 110, 120, 130],
                       eveScores: [120, 140, 160]
                      },
    feelingWell = true,
    finalDay =
      {
      fDay:  "Sunday",
      mornscore: 120,
      eveScore: 120,
      sumScores: function(i){
            var todScores = i + finalDay.mornscore
            console.log("The sum  of "+ finalDay.fDay +"'s" +" scores: "+todScores);
            
            }
      };
      
      
      
      
//hanlding json data to display ealier weeks stats    

var handleData = function(json) {
      for (var i = 0; i < json.dailyScores.length; i++){
        var dailyScores = json.dailyScores[i];
        console.log("Day: " + dailyScores.day + ", Breakfast BloodSugar: "
                    + dailyScores.Bfast + ", Dinner BloodSugar: "
                    + dailyScores.Dinn);
      };
};



// starting program here - need to answer this question to move on

var getAnswer = function(feelingWell){
      if (feelingWell === true){
            
            console.log(name + " is not feeling well and instead of wasting time looking at scores, she better test!"); 
            
      }
      else{
            console.log(name + " is feeling well, lets have a look at some weekly scores.");      
      };
      
      return feelingWell
};



//funtion determing 3 day score not json

getTotals = function(){
     var mornScoreTotal = ((dayOfWeekScores.mornScores[0])+(dayOfWeekScores.mornScores[1])+(dayOfWeekScores.mornScores[2])) 
     var eveScoreTotal = ((dayOfWeekScores.eveScores[0])+(dayOfWeekScores.eveScores[1])+(dayOfWeekScores.eveScores[2]))
     var total3Day = mornScoreTotal + eveScoreTotal 
     console.log("Your total morning score is: " +mornScoreTotal + " and evening total is: " +eveScoreTotal );     
    
    return total3Day
};




//function inserting todays scores

howMuchOver = function(i){
      var total6Day = i + 780
      var totalAllowed = (6 * 2)* 110
      var over = total6Day - totalAllowed
      if (totalAllowed < total6Day){
           console.log("The total over the allowance glucose level is: " +over);
           console.log("and youre body required an additional: " +(over/10) +" units of Insulin");
      }
      else{
           console.log("You have met the glucose requirements for this period.");   
      };
      
      return over

};



//output

console.log("It is " +feelingWell); getAnswer();
console.log("The first portion of the week resulted in days/scores of: ");
handleData(json);
console.log(name +" needs to determine how much insulin was consumed on " +dayOfWeekScores.days);
console.log("3 day summary: ");
getTotals();
howMuchOver(780);
finalDay.sumScores(130);
console.log("In addition " +name +" will need to determine how much insulin was consumed on " , finalDay.fDay);
console.log("the total on ", finalDay.fDay + " was: 250");
console.log("the total Insulin consumed on ", finalDay.fDay + " was " + ((250-240)/10) );

//fin







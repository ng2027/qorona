
populationDensities = []

// variables which store the color gradient, 

// g1 - g4 are the green colors, increasing in intensity from light green to dark green
// r1 - r4 are the red colors, increasing in intensity from light red to dark red
// the midpoint color is orange - this is the value which other colors are based off of

let colorG1 = "rgb(179, 255, 179"
let colorG2 = "rgb(102, 255, 102)"
let colorG3 = "rgb(0, 255, 0)"
let colorG4 = "rgb(0, 153, 0)"
let colorMidpointColor = "rgb(255, 153, 0)"
let colorR1 = "rgb(255, 204, 204)"
let colorR2 = "rgb(255, 153, 153)"
let colorR3 = "rgb(255, 26, 26)"
let colorR4 = "rgb(204, 0, 0)"


// list of blocks to hide the color of. this is so that the blocks outline the map of Qatar (more or less)
let listOfTransparentBlocks = [
    [6, 1],
    [7, 1],
    [8, 1],
    [9, 1],
    [10, 1],
    [11, 1],
    [15, 1],
    [16, 1],
    [17, 1],
    [18, 1],
    [19, 1],
    [6, 2],
    [7, 2],
    [8, 2],
    [9, 2],
    [16, 2],
    [17, 2],
    [18, 2],
    [19, 2],
    [6, 3],
    [7, 3],
    [8, 3],
    [9, 3],
    [16, 3],
    [17, 3],
    [18, 3],
    [19, 3],
    [6, 4],
    [7, 4],
    [8, 4],
    [19, 4],
    [6, 5],
    [7, 5],
    [8, 5],
    [19, 5],
    [6, 6],
    [7, 6],
    [19, 6],
    [7, 7],
    [18, 7],
    [19, 7],
    [17, 8],
    [18, 8],
    [19, 8],
    [18, 9],
    [19, 9],
    [18, 11],
    [19, 11],
    [19, 12],
    [19, 13],
    [19, 14],
    [19, 15],
    [6, 16],
    [19, 16],
    [6, 17],
    [19, 17],
    [6, 18],
    [18, 18],
    [19, 18],
    [6, 19],
    [7, 19],
    [8, 19],
    [9, 19],
    [17, 19],
    [18, 19],
    [6, 20],
    [17, 20],
    [18, 20]
]


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// this function generates random densities for each individual div on the map and returns an array which stores all of them
// we use this method as we do not have access to the real data yet.
function getPopulationDensities() {

    var arrayToBePushed = [];

    for (i = 1; i <= 480; i++) {
        var amountOfPeople = getRandomInt(500000);
        var area = 20 * 5;
        var popDensity = Math.round(amountOfPeople / area);
        arrayToBePushed.push(popDensity);
        if (i % 24 == 0) {
            populationDensities.push(arrayToBePushed)
            arrayToBePushed = []
        }
    }
    return (populationDensities)
}


// this function analyses the population data and finds the highest and smallest values
// it then calculates the midpoint between the range 
// it also seperates the range into eight seperate divisions. this is useful when it comes to assigning colors to the divs
function getBoundaries(arr) {
    var arrayOfMaxNumbers = [];
    var arrayOfMinNumbers = []
    for (i = 0; i < 24; i++) {
        arrayOfMaxNumbers.push(Math.max.apply(Math, arr[i]))
        arrayOfMinNumbers.push(Math.min.apply(Math, arr[i]))

    }
    var maxValue = Math.max.apply(Math, arrayOfMaxNumbers)
    var minValue = Math.min.apply(Math, arrayOfMinNumbers)
    colorSeperator = (maxValue - minValue) / 8
    Midpoint = (maxValue - minValue) / 2
    return [maxValue, minValue, colorSeperator, Midpoint]
}


function switchColor(coordinate, color) {
    // this function grabs a specific box and changes its color to the input color
    document.getElementById("box-" + coordinate[0] + "-" + coordinate[1]).style.backgroundColor = color;


}

function initiateSwitch(colorSeperator, Midpoint) {
    // this function calculates what the color of the divs should be based on an idea similar to the standard deviation of the densities from the median. 
    // if the density is greater than the midpoint, a reddish color from R1-R4 (mentioned above) is assigned to it. 
    // the color is decided based on how far the population density of the block varies from the median
    // the same logic works for the population densities less than the median , except the colors chosen are from G1-G4 (also mentioned above)
    popDensity = populationDensities;


    for (y = 1; y <= 20; y++) {

        arr = popDensity[y - 1]
        for (x = 1; x <= 24; x++) {
            var popDensityBox = arr[x - 1];
            var coordinate = [x, y];
            var deviationFromMidpoint = Midpoint - popDensityBox;
            if (deviationFromMidpoint >= 0) {
                var colorSet = [colorG1, colorG2, colorG3, colorG4]
            }
            else {
                var colorSet = [colorR1, colorR2, colorR3, colorR4]
            }
            deviationFromMidpoint = Math.abs(deviationFromMidpoint)
            if (deviationFromMidpoint <= (1 * colorSeperator)) {
                switchColor(coordinate, colorMidpointColor)
            }
            else if (1 * colorSeperator < deviationFromMidpoint && (2 * colorSeperator) >= deviationFromMidpoint) {
                switchColor(coordinate, colorSet[0])
            }
            else if (2 * colorSeperator < deviationFromMidpoint && (3 * colorSeperator) >= deviationFromMidpoint) {
                switchColor(coordinate, colorSet[1])
            }
            else if (3 * colorSeperator < deviationFromMidpoint && (4 * colorSeperator) >= deviationFromMidpoint) {
                switchColor(coordinate, colorSet[2])
            }
            else if (4 * colorSeperator < deviationFromMidpoint && (5 * colorSeperator) >= deviationFromMidpoint) {
                switchColor(coordinate, colorSet[3])
            }
        }
    }
}


// this function turns any unnecessary columns on the map to a transparent color. this helps the non-transparent blocks look like they outline the map of Qatar
function switchColumns() {
    var columns = document.getElementsByClassName("column");
    try {
        for (column in columns) {
            columns[column].style.backgroundColor = "transparent"
        }
    }
    catch {
        console.log("err")
    }
    for (i in listOfTransparentBlocks) {
        // console.log(listOfTransparentBlocks)
        // console.log(listOfTransparentBlocks[i])
        // console.log(listOfTransparentBlocks[i][0], listOfTransparentBlocks[i][1])
        var scaffold = "box-" + listOfTransparentBlocks[i][0] + "-" + listOfTransparentBlocks[i][1]
        console.log(scaffold)
        document.getElementById(scaffold).style.backgroundColor = "transparent"
    }


}




window.addEventListener("click", function (event) {
    var targetElement = event.target || event.srcElement;
    blockID = String(targetElement.id)
    xCoordinate = blockID.split("-")[1]
    yCoordinate = blockID.split("-")[2]
    density = populationDensities[yCoordinate - 1][xCoordinate - 1]
    var blockColor = String(targetElement.style.backgroundColor);
    var today = new Date();
    var day = today.getDay();
    var daylist = ["Sunday", "Monday", "Tuesday", "Wednesday ", "Thursday", "Friday", "Saturday"];
    console.log("Today is: " + daylist[day] + ".");
    var hour = today.getHours();
    var minute = today.getMinutes();
    if (String(minute).length == 1) {
        minute = "0" + minute 
        this.console.log(minute)
    }
    var second = today.getSeconds();
    var prepand = (hour >= 12) ? " PM " : " AM ";
    hour = (hour >= 12) ? hour - 12 : hour;
    if (hour === 0 && prepand === ' PM ') {
        if (minute === 0 && second === 0) {
            hour = 12;
            prepand = ' Noon';
        }
        else {
            hour = 12;
            prepand = ' PM';
        }
    }
    if (hour === 0 && prepand === ' AM ') {
        if (minute === 0 && second === 0) {
            hour = 12;
            prepand = ' Midnight';
        }
        else {
            hour = 12;
            prepand = ' AM';
        }
    }

    if (density < 1000) {
        busyness_array  = ["very low", "low", "average"]
        }
    else if (density < 2000) {
        busyness_array  = ["very low", "low", "average"]
    }    
    else if (density < 3000) {
        busyness_array  = ["low", "average", "high"]
    }
    else if (density < 4000) {
        busyness_array  = ["average", "high", "very high"]
    }
    else {
        busyness_array  = ["average", "high", "very high"]
    }

    function busy() {
        var busyness = busyness_array[getRandomInt(3)]
        var color;
        var orangeL = "rgb(255, 127, 0)"
        var orangeD = "rgb(255, 153, 51)"
        var yellowD = "rgb(255, 255, 0)"
        var yellowL = "rgb(255, 255, 10)"
        var green = "rgb(153, 255, 51)"
        switch (busyness) {
            case "very low":
                color=yellowD;
                break;
            case "low":
                color=yellowL;
                break;
            case "average":
                color=green;
                break;
            case "high":
                color= orangeL;
                break;
            case "very high":
                color=orangeD;
                break;
        }
        var scaffold = `<span style="color: ${color};">${busyness}</span>`
        return scaffold
    }

    if (prepand == "AM") {
        prepandopposite = " PM"
    }
    else {
        prepandopposite = " AM"
    }

    var time1 = hour + 1
    var time2 = hour + 3
    var time3 = hour + 5
    var time4 = hour + 7
  

    if (time1 > 12) {
        time1 = String(time1 - 12) + prepandopposite
    }
    else {
        time1 = String(time1) + prepand
    }
    
    if (time2 > 12) {
        time2 = String(time2 - 12) + prepandopposite
    }
    else {
        time2 = String(time2) + prepand
    }
    if (time3 > 12) {
        time3 = String(time3 - 12) + prepandopposite
    }
    else {
        time3 = String(time3) + prepand
    }
    if (time4 > 12) {
        time4 = String(time4 - 12) + prepandopposite
    }
    else {
        time4 = String(time4) + prepand

    }
    var list_of_times = [

        "Predicted timings based off of<br>previous densities: <br><br>" + `The population density will be ${busy()} at ${time1}`+ "<br>" + `It will be ${busy()} at ${time2}`+ "<br>" + `It will be ${busy()} at ${time3}` + "<br>" +`It will be ${busy()} at ${time4}` + "<br>" 
    ]
    


    if (!(blockColor == "transparent")) {
        document.getElementById("infoStats").innerHTML = "Density of selected block: " + density + " people per km<sup>2</sup><br><br>" + "Coordinates: (" + xCoordinate + ", " + yCoordinate + ")" +
        "<br><br>" + "Current Time: " + hour + ":"+ minute + prepand + "<br><br>" + list_of_times[0]
    }


})


var pp = getPopulationDensities()
var dd = getBoundaries(pp)
console.log(pp)
console.log(dd)
// console.log(pp)
// console.log(dd)
try {
    initiateSwitch(dd[2], dd[3]);
}
catch{
    console.log("err")
}
switchColumns()


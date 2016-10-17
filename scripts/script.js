//variables accessing HTML elements
var timeDisplayNode = document.querySelector(".time"),
	hexTimeDisplayNode = document.querySelector(".hex-time"),
	containerNode = document.querySelector(".container"),
	secondsLengthNode = document.querySelector(".seconds-length")

//initializing time/rgb variables
var now     = "",
	hours   = "",
	minutes = "",
	seconds = ""

var reds   = "",
	greens = "",
	blues  = ""

//Need to ask: this function does a lot, but really only invokes functions. Is that bad practice?
var changeDisplay = function() {
	getTime()
	getCenterRGBValuesFromTime()
	timeDisplayNode.innerHTML      = formatTime()
	hexTimeDisplayNode.innerHTML   = formatHex()
	secondsLengthNode.style.width  = formatSecondsLength()
	containerNode.style.background = formatBackgroundColor()
}

//assign time variables with current time
var getTime = function() {
	now     = new Date(),
	hours   = now.getHours() % 24,
	minutes = now.getMinutes(),
	seconds = now.getSeconds()
}

//variables for hex color. Each multiplied so rgb values don't stay in the first part of the spectrum only
var getCenterRGBValuesFromTime = function() {
	reds   = (hours * 10).toString(16),
    greens = (minutes * 4).toString(16),
    blues  = (seconds * 4).toString(16)
    return addLeadingZero(reds) + addLeadingZero(greens) + addLeadingZero(blues)
}

var getBorderRGBValuesFromTime = function() {
	var borderReds   = (hours).toString(16),
    borderGreens     = (minutes).toString(16),
    borderBlues      = (seconds).toString(16)
    return addLeadingZero(borderReds) + addLeadingZero(borderGreens) + addLeadingZero(borderBlues)
}

//for display purposes. Uses toString so integers can also have a length
var addLeadingZero = function(num) {
	if(num.toString().length === 1){
		num = "0" + num
	}
	return num
}

var formatTime = function() {
	hours   = addLeadingZero(hours)
	minutes = addLeadingZero(minutes)
	seconds = addLeadingZero(seconds)
	return hours + ":" + minutes + ":" + seconds;
}

//displays the hex code for the corresponding time
var formatHex = function() {
	return addLeadingZero(reds) + ":" + addLeadingZero(greens) + ":" + addLeadingZero(blues);
}


//increases width of line by a percentage of 60. For example: at 20 seconds, the div will be at 30%
var formatSecondsLength = function () {
	return (seconds * (100/60)) + "%";
}

//hexcode to change background color
var outputCenterHexCode = function() {
	return "#" + getCenterRGBValuesFromTime();
}

//hexcode to change background border color
var outputBorderHexCode = function() {
	return "#" + getBorderRGBValuesFromTime();
}

var formatBackgroundColor = function() {
	console.log(outputCenterHexCode(),outputBorderHexCode())
	//output should be like radial-gradient(circle, rgb(0,0,0), rgb(255,255,255))
	var newColor = "radial-gradient(circle," + outputCenterHexCode() + "," + outputBorderHexCode() + ")"
	return newColor
}

setInterval(changeDisplay,1000)
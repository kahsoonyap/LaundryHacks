// Initialize Firebase
var config = {
  apiKey: "AIzaSyAImQx-dVC-U6kDkFzd3eMA8top7OLQbok",
  authDomain: "hackathon-9cc1a.firebaseapp.com",
  databaseURL: "https://hackathon-9cc1a.firebaseio.com",
  storageBucket: "hackathon-9cc1a.appspot.com",
  messagingSenderId: "33377239520"
};
firebase.initializeApp(config);

var washingTime = 3;
var washingTimer = washingTime;

var d = firebase.database().ref().child("wm");

var wm = document.getElementById("wm");
wm.addEventListener("click", start);

function changeTime(){
	washingTimer--;
	if (washingTimer < 0){
		if (washingTimer == -1){
			wm.innerHTML = -washingTimer + " second late since last cycle";
		} else {
			wm.innerHTML = -washingTimer + " seconds late since last cycle";
		}
	} else if (washingTimer == 0){
		wm.innerHTML = "0 seconds left";
		wm.addEventListener("click", stop);
	} else {
		if (washingTimer == 1){
			wm.innerHTML = washingTimer + " second left";
		} else {
			wm.innerHTML = washingTimer + " seconds left";
		}
	}
}

var myEvent;
function start(e){
	e.preventDefault();
	console.log("a");
	d.on("value", function(snap){
		var isOn = snap.val();
		if (!isOn){
			d.set(true);
			myEvent = setInterval(changeTime, 1000);
			wm.removeEventListener("click", start);
		}
	});
}

function stop(e){
	e.preventDefault();
	window.clearTimeout(myEvent);
	washingTimer = washingTime;
	reset();
	wm.addEventListener("click", start);
}

var res = document.getElementById("reset");
res.addEventListener("click", reset);
function reset(){
	d.set(false);
}
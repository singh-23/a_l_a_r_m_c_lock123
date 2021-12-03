showAlarm();
console.log("this alarm clock app");

function timeUpdate() {
  let today = new Date();
  var hours = today.getHours();
  let minutes = today.getMinutes();
  let second = today.getSeconds();
  let ampm = "";
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours >= 12) {
    ampm = "PM";
  } else if (hours < 12) {
    ampm = "AM";
  }
  if (second < 10) {
    second = "0" + second;
  }
  if (hours > 12) {
    hours = hours - 12;
  }
  let str = hours + ":" + minutes + ":" + second + " " + ampm;
  let container = document.getElementById("container1");
  container.innerHTML = `<h3>${str}<h3>`;
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    Hour: hour,
    Minutes: minutes,
    AMPM: ampm,
  };
  notesObj.forEach((element1, index) => {
    if (
      element1.Hour == hours &&
      element1.Minutes == minutes &&
      element1.AMPM == ampm
    ) {
      playAudio();
      deletealarm(index);
      setTimeout(() => {
        location.reload();
      }, 60000);
    }
  });
}
timeUpdate();
let formelement = document.getElementById("form_clock");
formelement.addEventListener("submit", submition);
function submition(e) {
  let hour = document.getElementById("hour").value;
  let minutes = document.getElementById("minutes").value;
  let ampm = document.getElementById("ampm").value;
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    Hour: hour,
    Minutes: minutes,
    AMPM: ampm,
  };
  if (myObj.Hour != "" && myObj.minutes != "" && myObj.ampm != "") {
    notesObj.push(myObj);
  }

  localStorage.setItem("notes", JSON.stringify(notesObj));
  showAlarm(e1);

  e.preventDefult();
}
function showAlarm() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let show = document.getElementById("show_Alarm");
  let str = "";
  notesObj.forEach((element, index) => {
    str += `<div class="mx-2 my-2 card" style="width: 20rem">
        <div class="card-body">
          <h5 class="card-title text-center">${element.Hour}:${element.Minutes} ${element.AMPM}</h5>
        </div>
          <div class="col-12 container d-flex justify-content-center my-3">
          <button id="${index}" onclick="deletealarm(this.id)" class="btn btn-primary">Remove</button>
        </div>
        </div>`;
  });
  show.innerHTML = str;
}
function deletealarm(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showAlarm();
}
function stopAlarm(e) {
  location.reload();
  e.preventDefult();
}
function playAudio() {
  var audio = new Audio(
    "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba-online-audio-converter.com_-1.wav"
  );
  audio.play();
}
console.log("Hello world");

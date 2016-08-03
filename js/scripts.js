// pretty-pomodoro countdown timer!
var pomodoro = 25
var shortBreak = 5
var longBreak = 15
var timerHistory = new Array()
var mute = false
var editMode = false

function getTimeRemaining(deadline, startTime) {
  var t = Date.parse(deadline) - startTime
  var minutes = Math.floor((t / 1000 / 60));
  var seconds = Math.floor((t / 1000) % 60);
  return {
    'total' : t,
    'minutes': minutes,
    'seconds': seconds
  }
}
paused = true
var timeinterval

// event handlers
var pauseButton = document.getElementById('pause')
var playButton = document.getElementById('play')

function initializeTimer(min) {
  var currentTime = Date.parse(new Date())
  var deadline = new Date(currentTime + min * 60 * 1000)
  var startTimeLeft = deadline - currentTime

  var sound = new Audio("alarm.mp3")
  var timer = document.getElementById('timer')
  var minutes = timer.querySelector('#minutes')
  var seconds = timer.querySelector('#seconds')
  var t = getTimeRemaining(deadline, currentTime)
  if (t.minutes < 99) {
    minutes.innerHTML = ('0' + t.minutes).slice(-2)
  } else {
    minutes.innerHTML = t.minutes
  }

  seconds.innerHTML = ('0' + t.seconds).slice(-2)
  function updateTimer() {
    if (!paused) {
      var t = getTimeRemaining(deadline, currentTime)
      currentTime += 1000
      var type
      if (min == pomodoro) {
        type = "Pomodoro"
      } else if (min == shortBreak) {
        type = "Short Break"
      } else if (min == longBreak) {
        type = "Long Break"
      }
      document.title = "(" + ('0' + t.minutes).slice(-2) + ":"+ ('0' + t.seconds).slice(-2)+") " + type
      var newTimeLeft = deadline - currentTime
      if (t.minutes < 99) {
        minutes.innerHTML = ('0' + t.minutes).slice(-2)
      } else {
        minutes.innerHTML = t.minutes
      }
      seconds.innerHTML = ('0' + t.seconds).slice(-2)

      if (t.total <= 0) {
        clearInterval(timeinterval)
        var title = "Time's Up!"
        var message
        var historyItem
        if (min == pomodoro) {
          historyItem = {'type': 'Pomodoro'}
          message = "Your Pomodoro has finished!"
        } else if (min == shortBreak) {
          historyItem = {'type': 'Short Break'}
          message = "Your short break has finished!"
        } else if (min == longBreak) {
          historyItem = {'type': 'Long Break'}
          message = "Your long break has finished!"
        } else {
          historyItem = {'type': 'Custom'}
          message = "Your custom timer has finished!"
        }
        timerHistory.push(historyItem)
        $('#history').prepend($("<li>").text(historyItem.type))
        var notification = new Notification(title, {
          body: message,
          icon: 'favicon.ico'
        });
        if (!mute) {
          sound.play()
        }
      }
    var newHeight = (newTimeLeft / startTimeLeft) *5.2
    // console.log(newTimeLeft / startTimeLeft)
    // plain js
    // var bg = document.getElementById('timer-bg').style.height = newHeight + "em"

    // pretty jquery?
    $('#timer-bg').animate({
      height: newHeight + "em"
    }, 250)
    $('#timer').animate({
      //paddingTop: newHeight+ "em"
    }, 250)
    }
  }

  updateTimer();
  timeinterval = setInterval(updateTimer, 1000)

  pauseButton.addEventListener('click', function() {
    paused = true
    pauseButton.style.display = 'none'
    playButton.style.display = 'inline'
  }, false)

  playButton.addEventListener('click', function() {
    paused = false
    playButton.style.display = 'none'
    pauseButton.style.display = 'inline'
  }, false)
}

initialTime = pomodoro
var previousTime = initialTime
initializeTimer(initialTime)

var resetButton = document.getElementById('reset')
resetButton.addEventListener('click', function() {

  clearInterval(timeinterval)
  initializeTimer(previousTime)
  paused = false
}, false)

// timers
var pomodoroButton = document.getElementById('pomodoro-option')
var pomodoroButtonFunction = function() {
  clearInterval(timeinterval)
  paused = false
  initializeTimer(pomodoro)
  previousTime = pomodoro
  playButton.style.display = 'none'
  pauseButton.style.display = 'inline'
}
pomodoroButton.addEventListener('click', pomodoroButtonFunction, false)
var break1 = document.getElementById('short-break-option')
var break1Function = function() {
  clearInterval(timeinterval)
  paused = false
  initializeTimer(shortBreak)
  previousTime = shortBreak
  playButton.style.display = 'none'
  pauseButton.style.display = 'inline'
}
break1.addEventListener('click', break1Function, false)
var break2 = document.getElementById('long-break-option')
var break2Function = function() {
  clearInterval(timeinterval)
  paused = false
  initializeTimer(longBreak)
  previousTime = longBreak
  playButton.style.display = 'none'
  pauseButton.style.display = 'inline'

}
break2.addEventListener('click', break2Function, false)

Notification.requestPermission().then(function(result) {
  console.log(result);
});



// options
var fullscreenButton = document.getElementById('fullscreen')
var exitFullscreenButton = document.getElementById('fullscreen-exit')
fullscreenOn = false
fullscreenButton.addEventListener('click', function() {
  if (!fullscreenOn) {
    if(document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if(document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if(document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    } else if(document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    }
    fullscreenOn = true
  } else {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    fullscreenOn = false
  }
}, false)


var editButton = document.getElementById('edit')
var doneButton = document.getElementById('done')
var pomodoroEdit = document.getElementById('pomodoro-edit')
var shortBreakEdit = document.getElementById('short-edit')
var longBreakEdit = document.getElementById('long-edit')

var pomodoroBreakName = document.getElementById('pomodoro-option-name')
var shortBreakName = document.getElementById('sb-option-name')
var longBreakName = document.getElementById('lb-option-name')
editButton.addEventListener('click', function() {
  console.log("edit mode on")
  editMode = true
  pomodoroBreakName.style.display = "none"
  shortBreakName.style.display = "none"
  longBreakName.style.display = "none"

  doneButton.style.display = "inline-block"
  pomodoroEdit.value = pomodoro
  pomodoroEdit.style.display = "block"
  shortBreakEdit.value = shortBreak
  shortBreakEdit.style.display = "block"
  longBreakEdit.value = longBreak
  longBreakEdit.style.display = "block"

  pomodoroButton.removeEventListener('click', pomodoroButtonFunction)
  break1.removeEventListener('click', break1Function)
  break2.removeEventListener('click', break2Function)
}, false)

doneButton.addEventListener('click', function() {
  var p = parseInt(pomodoroEdit.value, 10)
  var s = parseInt(shortBreakEdit.value, 10)
  var l = parseInt(longBreakEdit.value, 10)
  if (isNaN(p)) {
    p = 25
  }
  if (isNaN(s)) {
    s = 5
  }
  if (isNaN(l)) {
    l = 15
  }
  pomodoro = p
  document.getElementById('pomodoro-time').innerHTML = pomodoro + " min"
  shortBreak = s
  document.getElementById('sb-time').innerHTML = shortBreak + " min"
  longBreak = l
  document.getElementById('lb-time').innerHTML = longBreak + " min"
  pomodoroBreakName.style.display = "block"
  shortBreakName.style.display = "block"
  longBreakName.style.display = "block"
  doneButton.style.display = "none"
  pomodoroEdit.style.display = "none"
  shortBreakEdit.style.display = "none"
  longBreakEdit.style.display = "none"
  pomodoroButton.addEventListener('click', pomodoroButtonFunction)
  break1.addEventListener('click', break1Function)
  break2.addEventListener('click', break2Function)
}, false)

var muteButton = document.getElementById('mute')
var unmuteButton = document.getElementById('unmute')
muteButton.addEventListener('click', function() {
  mute = true
  muteButton.style.display = "none"
  unmuteButton.style.display = "inline-block"
}, false)
unmuteButton.addEventListener('click', function() {
  mute = false
  unmuteButton.style.display = "none"
  muteButton.style.display = "inline-block"
}, false)

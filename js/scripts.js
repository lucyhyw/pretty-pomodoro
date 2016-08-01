// pretty-pomodoro countdown timer!

function getTimeRemaining(deadline, startTime) {
  var t = Date.parse(deadline) - startTime
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var seconds = Math.floor((t / 1000) % 60);
  return {
    'total' : t,
    'minutes': minutes,
    'seconds': seconds
  }
}

function initializeTimer(min) {

  var currentTime = Date.parse(new Date())
  var deadline = new Date(currentTime + min * 60 * 1000)
  var startTimeLeft = deadline - currentTime
  paused = false

  var timer = document.getElementById('timer')
  var minutes = timer.querySelector('#minutes')
  var seconds = timer.querySelector('#seconds')
  function updateTimer() {
    if (!paused) {
      var t = getTimeRemaining(deadline, currentTime)
      currentTime += 1000
      var newTimeLeft = deadline - currentTime
      minutes.innerHTML = ('0' + t.minutes).slice(-2)
      seconds.innerHTML = ('0' + t.seconds).slice(-2)

      if (t.total <= 0) {
        clearInterval(timeinterval)
        console.log('time up')
      }
    var newHeight = (newTimeLeft / startTimeLeft) * 83
    $('#timer-bg').animate({
      height: newHeight
    }, 500)
    }
  }

  updateTimer();
  var timeinterval = setInterval(updateTimer, 1000)

  // event handlers
  var pauseButton = document.getElementById('pause')
  pauseButton.addEventListener('click', function() {
    paused = true
  }, false)

  var playButton = document.getElementById('play')
  playButton.addEventListener('click', function() {
    paused = false
  }, false)

  var resetButton = document.getElementById('reset')
  resetButton.addEventListener('click', function() {
    clearInterval(timeinterval)
    initializeTimer(previousTime)
  }, false)

}

initializeTimer(25)

var previousTime = 25

Notification.requestPermission().then(function(result) {
  console.log(result);
});

var notification = new Notification("YOUR MESSAGE");

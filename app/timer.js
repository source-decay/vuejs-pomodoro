window.onload = function () {
  const MIN_TIME =  1;
  const MAX_TIME =  30;

  var app = new Vue({
    el: '#app',
    data: {
      max: MAX_TIME,
      min: MIN_TIME,
      timerId: '',
      timer: 1500,
      workTime: 1500,
      mins: 25,
      secs: 00,
      isRunning: false
    },

    methods: {
      adjustTime: function(action) {
        if (this.isRunning === false) {
          if (action == 'up') {
            this.workTime += 60;
            this.timer += 60;

            this.mins = parseInt(this.timer / 60, 10);
            this.secs = parseInt(this.timer % 60, 10);
          } else {
            this.workTime -= 60;
            this.timer -= 60;

            this.mins = parseInt(this.timer / 60, 10);
            this.secs = parseInt(this.timer % 60, 10);
          }
        }
      },

      timerObj: function(workTime) {
        this.timer = workTime;
        this.workTime = workTime;

        var _this = this;
        this.timerId = setInterval(function () {
          _this.mins = parseInt(_this.timer / 60, 10);
          _this.secs = parseInt(_this.timer % 60, 10);

          if (--_this.timer < 0) {
            _this.timer = _this.workTime;

            // Stop the clock at 00:00 until reset
            _this.stop();
            document.querySelector('#time').style.animation = "blink .5s infinite";
          }
        }, 1000);
      },

      start: function () {
        document.querySelector('#time').style.animation = '';

        this.isRunning = true;
        this.timerObj(this.timer);
      },

      stop: function () {
        document.querySelector('#time').style.animation = "blink 1s infinite";

        this.isRunning = false;
        return window.clearInterval(this.timerId);
      },

      reset: function () {
        this.isRunning = false;

        this.timer = 1500;
        this.workTime = 1500;

        this.mins = parseInt(this.timer / 60, 10);
        this.secs = parseInt(this.timer % 60, 10);

        // Remove blinking animation from time
        document.querySelector('#time').style.animation = '';

        return window.clearInterval(this.timerId);
      }

    },

    filters: {
      time: t => t < 10 ? '0' + t : t
    }
  })
}

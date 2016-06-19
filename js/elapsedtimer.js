jQuery(document).ready(function() {
  window.DigitalTimer = function(settings) {
    this.timerSettings = settings;
    this.pausedDate = new Date();

    this.getTimeElapsed = function() {
        this.timerMinutesElapsed = Math.floor((((new Date().getTime() - new Date(this.pastTime.getTime())) % 86400000) % 3600000) / 60000);
        this.timerHoursElapsed = Math.floor(((new Date().getTime() - new Date(this.pastTime.getTime())) % 86400000) / 3600000);
        this.timerSecondsElapsed = Math.floor(((((new Date().getTime() - new Date(this.pastTime.getTime())) % 86400000) % 3600000) % 60000) / 1000);
        this.elapsedInterval = setTimeout(this.getTimeElapsed.bind(this), 1000);
        this.handleElapsedTimerUI();
    };

    this.handleElapsedTimerUI = function() {
      jQuery(this.timerSettings.selector + ' .hours-elapsed').html(this.timerHoursElapsed);
      if (this.timerHoursElapsed == 1) {
        jQuery(this.timerSettings.selector + ' .hours-elapsed-container .label').html(" hour");
      }
      else if (this.timerHoursElapsed > 0) {
        jQuery(this.timerSettings.selector + ' .hours-elapsed-container .label').html(" hours");
      }

      jQuery(this.timerSettings.selector + ' .minutes-elapsed').html(this.timerMinutesElapsed);
      if (this.timerMinutesElapsed == 1) {
        jQuery(this.timerSettings.selector + ' .minutes-elapsed-container .label').html(" minute");
      }
      else if (this.timerMinutesElapsed > 0) {
        jQuery(this.timerSettings.selector + ' .minutes-elapsed-container .label').html(" minutes");
      }

      jQuery(this.timerSettings.selector + ' .seconds-elapsed').html(this.timerSecondsElapsed);
      if (this.timerSecondsElapsed == 1) {
        jQuery(this.timerSettings.selector + ' .seconds-elapsed-container .label').html(" second");
      }
      else if (this.timerSecondsElapsed > 0) {
        jQuery(this.timerSettings.selector + ' .seconds-elapsed-container .label').html(" seconds");
      }

      if (this.timerSettings.tickHandler) {
        this.timerSettings.tickHandler();
      }
    }

    this.setTimer = function() {
      this.pastTime = new Date();
      this.getTimeElapsed();
    };

    this.setCountdown = function(obj) {
      this.curTime = new Date().getTime();
      this.futureTime = new Date();

      if (this.timerSettings.hours) {
        this.timerSettings.hours = parseInt(this.timerSettings.hours);
        this.curHour = new Date().getHours();
        this.futureTime.setHours(this.curHour + this.timerSettings.hours);
        if (this.curTime >= this.futureTime.getTime()) {
          console.log('cannot set countdown to time in the past');
          return false;
        }
        this.futureHour = this.futureTime.getHours();
      }
      if (this.timerSettings.minutes) {
        this.timerSettings.minutes = parseInt(this.timerSettings.minutes);
        this.curMin = new Date().getMinutes();
        this.futureTime.setMinutes(this.curMin + this.timerSettings.minutes);
        if (this.curTime >= this.futureTime.getTime()) {
          console.log('cannot set countdown to time in the past');
          return false;
        }
        this.futureMin = this.futureTime.getMinutes();
      }
      if (this.timerSettings.seconds) {
        this.timerSettings.seconds = parseInt(this.timerSettings.seconds);
        this.curSec = new Date().getSeconds();
        this.futureTime.setSeconds(this.curSec + this.timerSettings.seconds);
        if (this.curTime >= this.futureTime.getTime()) {
          console.log('cannot set countdown to time in the past');
          return false;
        }
        this.futureSec = this.futureTime.getSeconds();
      }

      this.getTimeRemaining();
      this.hideUnusedElements();
    };

    this.resetTimer = function() {
      this.pastTime = new Date();
      this.timerHoursElapsed = 0;
      this.timerMinutesElapsed = 0;
      this.timerSecondsElapsed = 0;
      clearTimeout(this.elapsedInterval);
      this.handleElapsedTimerUI();
    };

    this.pauseTimer = function() {
      clearTimeout(this.elapsedInterval);
      this.pausedDate = new Date();
                        return this.pausedDate;
    };

    this.unpauseTimer = function() {
      var timeDiff = new Date() - this.pausedDate;
      this.pastTime.setTime(this.pastTime.getTime() + timeDiff);
      this.getTimeElapsed();
                        return timeDiff;
    };

    this.resetCountdown = function() {
      clearTimeout(this.timeRemainingInterval);
    };

    this.getTimerMinutesElapsed = function() {
      return this.timerMinutesElapsed;
    };

    this.getTimerHoursElapsed = function() {
      return this.timerHoursElapsed;
    };

    this.getTimerSecondsElapsed = function() {
      return this.timerSecondsElapsed;
    };

    this.getTimerMinutesRemaining = function() {
      return this.timerMinutesRemaining;
    }

    this.getTimerHoursRemaining = function() {
      return this.timerHoursRemaining;
    }

    this.handleTimerDone = function() {
      this.resetCountdown();
      this.resetTimer();
      if (this.timerSettings.callback) {
        try {
          this.timerSettings.callback();
        }
        catch (err) {
          console.log("Timer error: " + err);
        }
      };
    }

    this.checkIfTimerDone = function() {
      if (new Date().getTime() >= this.futureTime.getTime()) {
        this.handleTimerDone();
        return true;
      }
      return false;
    }

    this.countdownTimerStart = function() {
      this.resetCountdown();
      this.setCountdown(this.timerSettings);
    };

    this.elapsedTimerStart = function() {
      this.resetTimer();
      this.setTimer();
    };

    this.hideUnusedElements = function() {
      if (!this.timerSettings.hours && !this.timerSettings.showHours) {
        jQuery(this.timerSettings.selector + ' .hours-remaining').hide();

        if (!this.timerSettings.minutes && !this.timerSettings.showMinutes) {
          jQuery(this.timerSettings.selector + ' .minutes-remaining').hide();

        }
      }

      if (!this.timerSettings.seconds && !this.timerSettings.showSeconds) {
        jQuery(this.timerSettings.selector + ' .seconds-remaining').hide();
      }

    };
  };
});



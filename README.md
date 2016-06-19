# elapsedtimer
JQuery elapsed time counter

Basic usage:

    var elapsed_timer = new DigitalTimer({
      selector: '#digital-timer',
      tickHandler: function() {
        // Enter code here that will execute every second (optional). See js/example.js for a more advanced example.
        }
      }
  });

Advanced usage:

  var elapsed_timer = new DigitalTimer({
    selector: '#digital-timer',
    tickHandler: function() {
      /* If the number of hours that have passed is 0, then add a class so that the timer can be customized */
      /* This is completely optional and customizable */
      if (elapsed_timer.getTimerHoursElapsed() == 0) {
        jQuery('#digital-timer').addClass('no-hours');
      }
      else {
      /* Else if the number of hours is more than 0, remove the 'no-hours' class and add a 'no-seconds' class so that the seconds are hidden */
      /* This is completely optional and customizable */
        jQuery('#digital-timer').removeClass('no-hours');
        jQuery('#digital-timer').addClass('no-seconds');
      }
    }
  });


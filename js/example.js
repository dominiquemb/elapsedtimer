jQuery(document).ready(function() {
  /* Create a new DigitalTimer instance */
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

  /* Start the timer */
  elapsed_timer.elapsedTimerStart();

  /* Some optional code */
  var timeDiff = 0;

  /* Pause button (optional) */
  jQuery('.pause-timer').on('click', function() {
    elapsed_timer.pauseTimer();
    jQuery('.paused-screen').css('display','block');
    jQuery('html').addClass('paused');
    jQuery('.page-wrapper').css('display','none');
  });

  /* Unpause button (optional) */
  jQuery('.unpause-timer').on('click', function() {
    var newTimeDiff = elapsed_timer.unpauseTimer();
    timeDiff = timeDiff + newTimeDiff;
    jQuery('.paused-screen').css('display','none');
    jQuery('html').removeClass('paused');
    jQuery('.page-wrapper').css('display','block');
  });
});

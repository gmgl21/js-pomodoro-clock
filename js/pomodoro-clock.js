var clock = {
  sessionSeconds: 0,
  breakSeconds: 0,

  start: function () {
    var self = this;
    var s = this.sessionSeconds + 1;
    var b = this.breakSeconds + 1;
    this.interval = setInterval(function(){
      if(s > 0){
        s-=1;
        $("#state").text("Session");
        $("#min").text(Math.floor(s/60));
        $("#sec").text(Math.floor(s % 60));
      } else if (b > 0){
        b-=1;
        $("#state").text("Break");
        $("#min").text(Math.floor(b/60));
        $("#sec").text(Math.floor(b % 60));
      } else if (s === 0){
        s = self.sessionSeconds + 1;
        b = self.breakSeconds + 1;
      }
      self.sessionSeconds = s;
      var min = $("#min").text();
      var sec = $("#sec").text();

      if(min.length === 1){
        $("#min").text('0' + min);
      }
      if(sec.length === 1){
        $("#sec").text('0' + sec);
      }
    }, 1000)

  },

  pause: function () {
      clearInterval(this.interval);
      delete this.interval;
  },

  resume: function () {
    if(!this.interval) this.start();
  },
}

  var sessionTime = 25,
      breakTime = 5;

  $("#sessionTime").text(sessionTime);
  $("#breakTime").text(breakTime);

  function startClock(){
    clock.sessionSeconds = sessionTime * 60;
    clock.breakSeconds = breakTime * 60;
    clock.start();
    $("#start,#minusSession, #addSession, #minusBreak, #addBreak, #breakTime, #break, #session, #sessionTime").hide();
    $("#pause, #resume, #reset").show();
  }
  // Session Time
  $("#addSession").click(function(e){
    e.preventDefault();
    $("#sessionTime").text(sessionTime += 1);
  });
  $("#minusSession").click(function(e){
    e.preventDefault();
    if(sessionTime >= 2){
      $("#sessionTime").text(sessionTime -= 1);
    }
  });
  // Break Time
  $("#addBreak").click(function(e){
    e.preventDefault();
    $("#breakTime").text(breakTime += 1);
  });
  $("#minusBreak").click(function(e){
    e.preventDefault();
    if(breakTime >= 2){
      $("#breakTime").text(breakTime -= 1);
    }
  });

  $("#pause").click(function(){
    clock.pause();
  });
  $("#resume").click(function(){
    clock.resume();
  });
  $("#reset").click(function(){
    location.reload();
  });
  $("#pause, #resume, #reset").show();
  $("#start").click(function(){
    startClock();
  });

function () {
  "use strict";
  return function () {    
    window[window.predicta_enviroment.helperName].internal.sentPageview = true;
    while (window[window.predicta_enviroment.helperName].internal.eventQueue.length) {
      window[window.predicta_enviroment.helperName].event.apply(window[window.predicta_enviroment.helperName], window[window.predicta_enviroment.helperName].internal.eventQueue.shift());
    }
    while (window[window.predicta_enviroment.helperName].internal.timingQueue.length) {
         window[window.predicta_enviroment.helperName].timing.apply(window[window.predicta_enviroment.helperName], window[window.predicta_enviroment.helperName].internal.timingQueue.shift());
    }
  };
}
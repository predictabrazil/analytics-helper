  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var jQuery = window.jQuery;
  var fn = {};
  // Configurações do helper
  var options = {
    helperName: {{- GTM - Analytics Helper Name}}, // o nome da instância do helper
    dataLayerName: 'dataLayer', // o nome do dataLayer utilizado pelo helper no objeto window do navegador
    debug: ({{Debug Mode}} || false), // o estado do debug mode - true or false
    waitQueue: true, // se os eventos entram na fila (true) ou não (false)
    analyticsUA: ({{dinamyc_GA_UA}} || ''), //a instância do GA que está sendo utilizado para registro dos dados
    containerId: ({{Container ID}} || ''), //o id do container do GTM
    exceptionEvent: 'gtm_dataQuality_event', // o nome do evento que registra as exceções
    exceptionCategory: 'GTM Exception', // a categoria em caso de exceções na execução do código
    customNamePageview: 'ga_pageview', // o nome do trigger de visualizações de página no GTM
    customNameVirtualPageview: 'ga_virtual_pageview', // o nome do trigger de mudanças de páginas em single Apps no GTM
    customNameEvent: 'ga_event',  // o nome do trigger de eventos no GTM
    conversionNameEvent: 'ga_conversion_event',  // o nome do trigger de eventos de conversão no GTM
    customNameTiming: 'ga_timing',
    errorSampleRate: 1,
    gtmCleanup: function (gtmId) {
      helper.setDataLayer('ecommerce', undefined);
      helper.setDataLayer('noInteraction', undefined);
    },
    overwriteHelper: false
  };

  var internal = {
    sentPageview: false,
    timingQueue: [],
    eventQueue: []
  };

  var helper = {
    internal: internal,
    init: init,
    pageview: pageview,
    virtual_pageview: virtual_pageview,
    event: event,
    conversionEvent: conversionEvent,
    timing: timing,
    sanitize: sanitize,
    debounce: debounce,
    getDataLayer: getDataLayer,
    setDataLayer: setDataLayer,
    cookie: cookie,
    getKey: getKey,
    safeFn: safeFn,
    fn: fn,
    options: options
  };
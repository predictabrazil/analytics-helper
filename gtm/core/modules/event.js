/**
 * Disparo personalizado de eventos
 * @param {*} category Categoria do evento
 * @param {*} action Ação do evento
 * @param {*} label Rótulo do evento
 * @param {*} value Valor do evento
 * @param {*} object Objeto para ser inserido no dataLayer
 * que pode ser utilizado para Enhanced Ecommerce, dentre outros.
 */

  function event(category, action, label, value, object, sanitizedBefore, id) {
    try {
      if (internal && internal.sentPageview === false && options.waitQueue) {
        log('Info', 'The event (' + arguments + ') has been add to the queue');
        return internal.eventQueue.push(arguments);
      }

      if (value != null && typeof value === 'object') {
        object = value;
        value = undefined;
      } else {
        object = object || {};
      }

      var result = {
        event: options.customNameEvent,
        eventCategory: category,
        eventAction: action,
        eventValue: value,
        eventLabel: sanitizedBefore ? label : helper.sanitize(label, {spacer: ' ', onlyWhiteSpaces: true}),
        _tag: id
      };

      if (options.gtmCleanup) {
        result.eventCallback = options.gtmCleanup;
      }

      log('info', result, object);
      window[options.dataLayerName].push(merge(result, object));
    } catch (err) {
      log('warn', err);
    }
  }

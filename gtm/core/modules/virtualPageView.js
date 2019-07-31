  function virtual_pageview(path, object, id) {
    try {
      var result = {
        event: options.customNameVirtualPageview,
        path: path,
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

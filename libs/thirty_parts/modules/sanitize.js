  function sanitize(str, opts) {
    var split, i, spacer;

    if (!str) return '';
    opts = opts || {};
    spacer = typeof opts.spacer === 'string' ? opts.spacer : '_';


    if(opts && opts.onlyWhiteSpaces){
      str = str.replace(/^\s+/, '')
        .replace(/\s+$/, '')
        .replace(/\s+/g, '_');
    } else {
      str = str.replace(/^\s+/, '')
        .replace(/\s+$/, '')
        .replace(/\s+/g, '_')
        .replace(/[áàâãåäæª]/g, 'a')
        .replace(/[ÁÀÂÃÅÄÆ]/g, 'A')
        .replace(/[éèêëЄ€]/g, 'e')
        .replace(/[ÉÈÊË]/g, 'E')
        .replace(/[íìîï]/g, 'i')
        .replace(/[ÍÌÎÏ]/g, 'I')
        .replace(/[óòôõöøº]/g, 'o')
        .replace(/[ÓÒÔÕÖØ]/g, 'O')
        .replace(/[úùûü]/g, 'u')
        .replace(/[ÚÙÛÜ]/g, 'U')
        .replace(/[ç¢©]/g, 'c')
        .replace(/[Ç]/g, 'C')
        .replace(/[^a-zA-Z0-9_\-]/g, '_');
    }

    if(opts && opts.caseMode){
      switch (opts.caseMode){
        case "capitalized":
          split = str.replace(/^_+|_+$/g, '').split(/_+/g);
          for (i = 0; i < split.length; i++) {
            if (split[i]) split[i] = split[i][0].toUpperCase() + split[i].slice(1);
          }
          return split.join(spacer);
          break;
        case "lowercase":
          str = str.toLowerCase();
          break;
        case "uppercase":
        str = str.toUpperCase();
          break;
        default:
          break;
      }
    }

    return str.replace(/^_+|_+$/g, '').replace(/_+/g, spacer);
  }

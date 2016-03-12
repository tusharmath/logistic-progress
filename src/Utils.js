const e = exports
e.getStart = (source) => source.filter(x => Boolean(x))
e.getStop = (source) => source.filter(x => !Boolean(x))

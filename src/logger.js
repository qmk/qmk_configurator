import * as pino from 'pino';

function getCallerLine(stack) {
  const s = stack.split('\n');
  if (s[4]) {
    const caller = s[4].substring(s[4].indexOf('('));
    return caller.substring(1, caller.length - 1);
  } else {
    return '';
  }
}

const logger = pino({
  level: 'debug',
  browser: {
    write: o => {
      const args = [];
      delete o.time;
      let fn;
      switch (o.level) {
        case 10:
          o.level = 'trace';
          fn = console.trace;
          break;
        case 20:
          o.level = 'debug';
          fn = console.debug;
          break;
        case 30:
          o.level = 'info';
          fn = console.info;
          break;
        case 40:
          o.level = 'warn';
          fn = console.warn;
          break;
        case 50:
          o.level = 'error';
          fn = console.error;
          break;
        default:
          o.level = 'log';
          fn = console.log;
          break;
      }
      const strLevel = `[${o.level.toUpperCase()}]`.padEnd(7, ' ');
      args.push(strLevel);
      delete o.level;
      if (o.module) {
        args.push(`[${o.module}]`);
        delete o.module;
      }
      // String message
      if (o.msg) {
        args.push(o.msg);
        delete o.msg;
      }
      // If an object is logged we push it as a last parameter
      if (Object.keys(o).length > 0) {
        args.push(o);
      }
      fn(...args);
      // On production we don't print the line because
      // this is chrome doing the path resolution between
      // compiled files and sourcemap
      if (process.env.NODE_ENV !== 'production') {
        const err = new Error();
        Error.captureStackTrace(err);
        const caller = getCallerLine(err.stack);
        if (caller) {
          fn(caller);
        }
      }
    }
  }
});

export { logger };

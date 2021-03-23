interface LogFn {
  /* tslint:disable:no-unnecessary-generics */
  <T extends object>(obj: T, msg?: string, ...args: any[]): void;
  (msg: string, ...args: any[]): void;
}

export interface ILogger {
  error: LogFn;
  warn: LogFn;
  info: LogFn;
  debug: LogFn;
  trace: LogFn;
}

declare module 'sql.js' {
  function initSqlJs(config?: unknown): Promise<{ Database: new () => unknown }>;
  export default initSqlJs;
}

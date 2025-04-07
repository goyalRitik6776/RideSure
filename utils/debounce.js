/**
 * Used to debounce repeated function calls
 *
 * @name debounce
 * @category utilities
 * @description
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked, or until the next browser frame is drawn. The debounced function
 * comes with a `cancel` method to cancel delayed `func` invocations and a
 * `flush` method to immediately invoke them. Provide `options` to indicate
 * whether `func` should be invoked on the leading and/or trailing edge of the
 * `wait` timeout. The `func` is invoked with the last arguments provided to the
 * debounced function. Subsequent calls to the debounced function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
 * invocation will be deferred until the next frame is drawn (typically about
 * 16ms).
 *
 * @param {Function} func - function that needs to be debounced
 * @param {number} [wait=0] - number of milliseconds to wait
 * @param {Object} [options={}] - additional options
 * @param {boolean} [options.leading=false] - Specify invoking on the leading edge of the timeout
 * @param {boolean} [options.trailing=true] - Specify invoking on the trailing edge of the timeout
 * @param {number} [options.maxwait=0] - maximum amount of wait that needs to be done
 * @returns {Function} Returns the new debounced function.
 *
 * @example
 * // Avoid costly calculations while the window size is in flux.
 * window.addEventListener('resize', debounce(calculateLayout, 150))
 *
 * // Invoke "sendMail" when clicked, debouncing subsequent calls.
 * element.addEventListener('click', debounce(sendMail, 300, {
 *   leading: true,
 *   trailing: false
 * }))
 *
 * // Ensure "batchLog" is invoked once after 1 second of debounced calls.
 * const debounced = debounce(batchLog, 250, { maxwait: 1000 })
 * const source = new EventSource('/stream')
 * source.addEventListener('message', debounced)
 *
 * // Cancel the trailing debounced invocation.
 * window.addEventListener('popstate', debounced.cancel)
 */
function debounce(func, wait = 0, options = {}) {
    if (!func) {
      throw new SyntaxError('Expected function');
    }
    if (typeof func !== 'function') {
      throw new TypeError('expected first parameter as function');
    }
  
    let leading = false;
    let trailing = true;
    let maxwait = 0;
    let maxtimer = null;
  
    if (options) {
      if (typeof options === 'object') {
        leading = 'leading' in options && typeof options.leading === 'boolean' ? options.leading : leading;
        trailing = 'trailing' in options && typeof options.trailing === 'boolean' ? options.trailing : trailing;
        maxwait = 'maxwait' in options && typeof options.maxwait === 'number' ? options.maxwait : maxwait;
      }
    }
  
    let timerId = null;
    let lastFunctionArguments = null;
    let lastThis = null;
    let result = null;

    function nullFunc() {
        return null; 
    }
  
    if (!leading && !trailing) return nullFunc;
  
    function invokeFunc() {
      if (lastFunctionArguments) {
        result = func.apply(lastThis, lastFunctionArguments);
      }
      lastFunctionArguments = null;
      lastThis = null;
      return result;
    }
  
    function leadingEdge() {
      if (leading) {
        return invokeFunc();
      }
    }
  
    function trailingEdge() {
      timerId = null;
      if (trailing && lastFunctionArguments) {
        return invokeFunc();
      }
    }
  
    function cancel() {
      if (timerId) {
        clearTimeout(timerId);
      }
      if (maxtimer) {
        clearTimeout(maxtimer);
      }
      timerId = null;
      maxtimer = null;
      lastFunctionArguments = null;
      lastThis = null;
    }
  
    function flush() {
      if (!timerId) {
        return result;
      }
      cancel();
      return invokeFunc();
    }
  
    function pending() {
      return timerId !== null;
    }
  
    function debounced() {
      lastThis = this;
      lastFunctionArguments = arguments;
      
      if (timerId) {
        clearTimeout(timerId);
      } else if (leading) {
        result = leadingEdge();
      }
  
      timerId = setTimeout(trailingEdge, wait);
  
      if (maxwait && !maxtimer) {
        maxtimer = setTimeout(() => {
          flush();
        }, maxwait);
      }
  
      return result;
    }
  
    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;
  
    return debounced;
  }
  
  export default debounce;
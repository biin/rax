export default class Event {
  constructor(type, options = {}) {
    this.type = type.toLowerCase();
    this.bubbles = !!options.bubbles;
    this.cancelable = !!options.cancelable;
    this.defaultPrevented = false;
  }
  stopPropagation() {
    this.bubbles = false;
  }
  stopImmediatePropagation() {
    this.bubbles = false;
    this._end = true;
  }
  preventDefault() {
    if (this.cancelable) {
      this.defaultPrevented = true;
    } else {
      // Calling preventDefault in uncancelable event should produce errors,
      // but in chrome and safari, which not throw or console errors, follow behaviors here.
    }
  }
}

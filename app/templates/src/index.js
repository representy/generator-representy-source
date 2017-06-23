class <%= className %> {
  constructor(options) {
    this.options = options || {};
  }

  async load() {
    throw new Error('This part should be implemented');
  }
}

export default <%= className %>;
export { <%= className %> as Source };

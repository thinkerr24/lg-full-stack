const request = {
  get method() {
    return this.req.method;
  },

  get header() {
    return this.req.headers;
  },

  get url() {
    return this.req.url;
  },

  get path() {
    const url = new URL(this.req.url, "http://localhost:3002");
    return url.pathname;
  },

  get query() {
    const url = new URL(this.req.url, "http://localhost:3002");
    //url.searchParams.get('id') //req.query.id
    return url.search;
  },
};

module.exports = request;

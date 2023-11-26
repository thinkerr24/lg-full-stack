const response = {
  set status(code) {
    this.res.statusCode = code;
  },
};

module.exports = response;

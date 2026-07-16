var gurt = /** @class */ (function () {
  function gurt(name) {
    this.id = 0;
    if (name) this.name = name;
    this.id = gurt.count++;
  }
  gurt.prototype.yo = function (message) {
    console.log(
      ""
        .concat(this.name || "gurt", " (")
        .concat(this.id, "/")
        .concat(gurt.count, "): ")
        .concat(message || "yo"),
    );
  };
  gurt.count = 0;
  return gurt;
})();
new gurt().yo();

class Pipe {
  constructor() {
    this.x = 800 - 80;
    this.id_top = Math.floor(Math.random() * 10000000);
    this.id_low = Math.floor(Math.random() * 10000000);
    this.top_border = Math.floor(Math.random() * 300) + 100;
    this.low_border = 700 - this.top_border - 200;

    //append to div
    $("#pipes").append(
      "<div id='pipe" +
        this.id_top +
        "' class='pipe' style='left:" +
        this.x +
        "px;height:" +
        this.top_border +
        "px;top:0;'>"
    );
    $("#pipes").append(
      "<div id='pipe" +
        this.id_low +
        "' class='pipe' style='left:" +
        this.x +
        "px;height:" +
        this.low_border +
        "px;bottom:0px;'>"
    );
  }

  show() {
    document.getElementById("pipe" + this.id_top).style.left = this.x + "px";
    document.getElementById("pipe" + this.id_low).style.left = this.x + "px";
  }

  move(speed) {
    //update position
    this.x -= 20;
  }

  remove() {
    $("#pipe" + this.id_top).remove();
    $("#pipe" + this.id_low).remove();
  }
}

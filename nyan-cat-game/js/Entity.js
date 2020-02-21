class Entity {
  render = (url, positionLeft, positionTop, zIndex) => {
    this.domElement = document.createElement("img");
    this.domElement.style.position = "absolute";
    this.domElement.src = url;
    this.domElement.style.left = positionLeft;
    this.domElement.style.top = positionTop;
    this.domElement.style.zIndex = zIndex;
  };
}

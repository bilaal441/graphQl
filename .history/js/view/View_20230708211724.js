class View {
  parentEl;
  render(data) {
    this.parentEl.innerHTML = ``;
    this.generateMarkUp(data);
  }
}

export default View;

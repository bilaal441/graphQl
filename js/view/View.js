class View {
  parentEl;
  render(data) {
    this.parentEl.innerHTML = ``;
    const markup = this.generateMarkUp(data);
    this.parentEl.insertAdjacentHTML("beforeEnd", markup);
  }
}

export default View;

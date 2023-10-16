class View {
  parentEl;
  render(data) {
    this.parentEl.innerHTML = ``;
   const mark this.generateMarkUp(data);
  }
}

export default View;

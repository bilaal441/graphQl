class View {
  parentEl;
  render(data) {
    this.parentEl.innerHTML = ``;
   const markup = this.generateMarkUp(data);
   this.parentEl.insert

  }
}

export default View;

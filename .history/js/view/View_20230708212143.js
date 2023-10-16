class View {
  parentEl;
  render(data) {
    this.parentEl.innerHTML = ``;
   const markup = this.generateMarkUp(data);

   
  }
}

export default View;

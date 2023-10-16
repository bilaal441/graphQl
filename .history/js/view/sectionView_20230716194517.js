import View from "./View.js";
class Section extends View {
  parentEl = document.querySelector("#cards");
  generateMarkUp(data) {
    return ` <div class="container">
    <div class="user-idetification">
      <h1>Welcome, ${data.name} !</h1>
      <div> <button class="logout">logout</button>     </div>
    </div>
    <div class="card-container">
      <div class="level grid-item">
        <span class="level-label">current level</span>

        <div class="level-amount">${data.level}</div>
      </div>
      <div class="xp grid-item">
        <span class="label">xp amount</span>
        <div class="amount-conatiner">
          <span class="amount">${data.xp}</span> <span class="unit"> KB</span>
        </div>
      </div>
    </div>
  </div>`;
  }

  logoutHandler(callBack) {
    this.logoutBtn?.addEventListener("click", (e) => {

      if(e.target.classList.contains(''))
      console.log(e);
      callBack();
    });
  }
}

export default new Section();

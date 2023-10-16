import View from "./View.js";

class LoginView extends View {
  login = 
  el = document.querySelector(".login");
  errEl = document.querySelector(".err-message");

  error(err) {
    this.errEl.classList.remove("hidden");
    this.errEl.textContent = err;
  }

  loginSubmissionHandler(callBack) {
    this.el.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData.entries());
      callBack(formValues);
    });
  }

  hiddeForm() {
    const inputs = document.querySelectorAll("input");
    inputs.forEach((el) => (el.value = ""));
    this.el.classList.add("hidden");
  }
}

export default new LoginView();

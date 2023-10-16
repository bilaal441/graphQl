import View from "./View.js";

class LoginView extends View {
  login = document.querySelector(".login-signup");
  logoutBtn = document.querySelector('.logout')
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
    this.login.classList.add("hidden");
    const inputs = document.querySelectorAll("input");
    inputs.forEach((el) => (el.value = ""));
  }

  showForm() {
    this.login.classList.remove("hidden");
  }

  logout(){
this.ou

  }
}

export default new LoginView();

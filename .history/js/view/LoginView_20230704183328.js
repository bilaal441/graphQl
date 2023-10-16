import View from "./View.js";

class LoginView extends View {
  el = document.querySelector(".login");
  loginSubmissionHandler(callBack) {
    this.el.addEventListener("submit", (e) => {
      event.preventDefault();
      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData.entries());

     
    });
  }
}

export default new LoginView();

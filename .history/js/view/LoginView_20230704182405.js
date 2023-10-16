import View from "./View.js";

class LoginView extends View {
  el = document.querySelector(".login");
  loginSubmissionHandler(callBack) {
    this.el.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const formValues = Object.fromEntries(formData.entries());

      console.log(formValues.);
    });
  }
}

export default new LoginView();

import {View} from "./View.js";

class LoginView extends View {
  el = document.querySelector(".login");
  loginSubmissionHandler(callBack) {
    this.el.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailInputValue = this.emailInputEl().value;

      const formData = new FormData(form);

      // Convert the FormData object to a plain JavaScript object
      const formValues = Object.fromEntries(formData.entries());
      co
    });
  }
}

export default new LoginView();

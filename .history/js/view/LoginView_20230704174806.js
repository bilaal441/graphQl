import View from "./View.js";

class LoginView extends View {
  el = document.querySelector(".login");
  loginSubmissionHandler(callBack) {
    this.el.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const validatedValues = this.validateForm(formValues)
     

      console.log(formData);
    });
  }
}

export default new LoginView();

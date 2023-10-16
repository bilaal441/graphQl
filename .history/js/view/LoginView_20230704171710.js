import View from "./View.js";

class LoginView extends View {
  el = document.querySelector(".login");
  loginSubmissionHandler(callBack) {
    this.el.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(this.el);

      // Convert the FormData object to a plain JavaScript object
      // const formValues = Object.fromEntries(formData.entries());
      console.log(formValues);
    });
  }
}

export default new LoginView();

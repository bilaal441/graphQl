import View from "./View.js";

class LoginView extends View {
  el = document.querySelector(".login");
  errEl = document.querySelector('.err-message')

  error(){
const 
  }

  loginSubmissionHandler(callBack) {
    this.el.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formValues = Object.fromEntries(formData.entries());
        
      

      callBack(formValues);
    });
  }
}

export default new LoginView();

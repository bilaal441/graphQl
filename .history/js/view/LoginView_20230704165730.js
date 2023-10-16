import {View} from "./View.js";

class LoginView extends View {
 el = document.querySelector('.login')
loginSubmissionHandler(callBack){
  this.el.addEventListener('submit', (event) => {
 event.preventDefault();
 const emailInputValue= this.emailInputEl().value;




  })


}
}

export default new LoginView();

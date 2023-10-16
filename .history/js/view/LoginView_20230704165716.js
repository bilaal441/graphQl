import {View} from "./View.js";

class LoginView extends View {
 el = document.querySelector('.login')
loginSubmissionHandler(callBack){
  this.el.addEventListener('submit', (event) => {
 event.preventDefault();
 




  })


}
}

export default new LoginView();

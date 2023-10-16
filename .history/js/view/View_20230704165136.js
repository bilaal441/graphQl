class View {
  render(data) {}

  toggleSignInSignup() {
    const loginSignupEl = document.querySelector(".login-signup");
    loginSignupEl.addEventListener("click", (e) => {
      const el = e.target;
      if (el.classList.contains("go-signup")) {
        //show sign up form
        e.currentTarget.querySelector(".sign-in").classList.add("hidden");
        e.currentTarget.querySelector(".sign-up").classList.remove("hidden");
      }

      if (el.classList.contains("go-signin")) {
        // go-signin
        e.currentTarget.querySelector(".sign-up").classList.add("hidden");
        e.currentTarget.querySelector(".sign-in").classList.remove("hidden");
      }
    });
  }
}

export default View;
$(() => {

  const $signUpForm = $(`
  <form id="sign-up-form" class="sign-up-form">
        <p>Sign Up</p>

        <div class="sign-up-form__field-wrapper">
            <input type="text" name="name" placeholder="Username">
          </div>

        <div class="sign-up-form__field-wrapper">
          <input type="email" name="email" placeholder="Email">
        </div>

        <div class="sign-up-form__field-wrapper">
            <input type="password" name="password" placeholder="Password">
          </div>

        <div class="sign-up-form__field-wrapper">
            <button>Sign Up</button>
        </div>
      </form>
  `);

  window.$signUpForm = $signUpForm;


});

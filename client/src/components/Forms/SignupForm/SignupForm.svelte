<script>
  import Button from "../../Button/Button.svelte";

  let signupFields = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  function submitHandler() {
    signupFields.firstName = "";
    signupFields.lastName = "";
    signupFields.email = "";
    signupFields.password = "";
  }
</script>

<form on:submit|preventDefault={submitHandler}>
  <h3>Sign up for an account</h3>
  <div class="form-field">
    <label for="firstName">First name:</label>
    <input
      type="text"
      id="firstName"
      bind:value={signupFields.firstName}
      placeholder="John"
      required
    />
  </div>
  <div class="form-field">
    <label for="lastName">Last name:</label>
    <input
      type="text"
      id="lastName"
      bind:value={signupFields.lastName}
      placeholder="Doe"
      required
    />
  </div>
  <div class="form-field">
    <label for="email">Email:</label>
    <input
      type="email"
      id="email"
      bind:value={signupFields.email}
      placeholder="example@mail.com"
      required
    />
  </div>
  <div class="form-field">
    <label for="password">Password:</label>
    <input
      type="password"
      id="password"
      bind:value={signupFields.password}
      placeholder="********"
      required
    />
  </div>
  <div class="btn-container">
    <Button type={"tertiary"}>Login</Button>
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    width: 100%;
  }
  h3 {
    margin-bottom: 20px;
  }
  .form-field {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
  }
  label {
    text-align: left;
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 8px;
  }
  input {
    border: 1px solid #f7f7f7;
    background-color: #f7f7f7;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 16px;
    width: 100%;
  }
  .btn-container {
    width: 90%;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    gap: 10px;
  }
</style>

<script>
  import Button from "../../Button/Button.svelte";
  import { createEventDispatcher } from "svelte";
  import { fetchPost } from "../../../util/api";
  import { AUTH_URL } from "../../../stores/generalStore";
  import toast from "svelte-french-toast";

  let dispatch = createEventDispatcher();

  let signupFields = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  async function signupHandler() {
    const signupCredentials = signupFields;
    const response = await fetchPost(`${$AUTH_URL}/signup`, signupCredentials);

    if (response) {
      toast.success("Account created!");
      closeModal();
    } else {
      toast.error("Failed to create account");
    }
  }

  function closeModal() {
    dispatch("close");
  }
</script>

<div class="form-container">
  <form on:submit|preventDefault={signupHandler}>
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
      <label for="signup-email">Email:</label>
      <input
        type="email"
        id="signup-email"
        bind:value={signupFields.email}
        placeholder="example@mail.com"
        required
      />
    </div>
    <div class="form-field">
      <label for="password">Password:</label>
      <input
        type="signup-password"
        id="signup-password"
        bind:value={signupFields.password}
        placeholder="********"
        required
      />
    </div>
    <div class="btn-container signup">
      <Button type={"tertiary"}>Sign up</Button>
    </div>
  </form>
  <div class="btn-container cancel">
    <Button type={"default"} on:click={closeModal}>Cancel</Button>
  </div>
</div>

<style>
  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
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
    width: 95%;
    display: flex;
    flex-direction: column;
  }
  .signup {
    margin-top: 15px;
  }
  .cancel {
    width: 90%;
    margin-bottom: 10px;
  }
</style>

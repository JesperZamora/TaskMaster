<script>
  import Button from "../../Button/Button.svelte";
  import { login } from "../../../stores/userStore";
  import { fetchPost } from "../../../util/api";
  import { AUTH_URL } from "../../../stores/generalStore";
  import toast from "svelte-french-toast";

  let loginFields = {
    email: "",
    password: "",
  };

  async function handleSumbit() {
    const loginCredentials = loginFields;
    const response = await fetchPost(`${$AUTH_URL}/login`, loginCredentials);

    if (response) {
      login(loginCredentials.email);
      toast.success("Successfully login!");
    } else {
      toast.error("Failed to login");
    }
    loginFields.email = "";
    loginFields.password = "";
  }
</script>

<div class="form-container">
  <form on:submit|preventDefault={handleSumbit}>
    <h3>Login to access your tasks</h3>
    <div class="form-field">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        bind:value={loginFields.email}
        placeholder="example@mail.com"
        required
      />
    </div>
    <div class="form-field">
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        bind:value={loginFields.password}
        placeholder="********"
        required
      />
    </div>
    <div class="btn-container">
      <Button type={"tertiary"}>Login</Button>
    </div>
  </form>
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    width: 400px;
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
  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .btn-container {
    width: 95%;
    display: flex;
    flex-direction: column;
  }
</style>

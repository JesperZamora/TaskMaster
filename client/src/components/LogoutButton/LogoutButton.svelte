<script>
  import Button from "../Button/Button.svelte";
  import toast from "svelte-french-toast";
  import { fetchGet } from "../../util/api.js";
  import { AUTH_URL } from "../../stores/generalStore.js";
  import { logout, user } from "../../stores/userStore.js";

  async function handleLogout() {
    const response = await fetchGet(`${$AUTH_URL}/logout`);

    if (response) {
      logout();
      toast.success("Successfully logged out!");
    } else {
      toast.error("Failed to logout");
    }
  }
</script>

{#if $user !== null}
  <Button type="default" on:click={handleLogout}>Logout</Button>
{/if}

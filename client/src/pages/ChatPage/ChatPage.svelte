<script>
  import Button from "../../components/Button/Button.svelte";
  import { io } from "socket.io-client";
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/generalStore";

  let message = "";
  let messages = [];

  const socket = io($BASE_URL);

  function handleSubmit() {
    if (message.trim()) {
      socket.emit("client", message);
      message = "";
    }
  }

  onMount(() => {
    socket.on("message", (data) => {
      messages = [...messages, data];
    });
  });
</script>

<div class="chat-container">
  <h3>Public chat</h3>
  <div>
    <ul class="chat-list">
      {#each messages as msg}
        <li><strong>{msg}</strong></li>
      {/each}
    </ul>
  </div>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="input-container">
      <input
        class="message"
        type="text"
        placeholder="Write message..."
        bind:value={message}
        required
      />
      <Button type="primary">Submit</Button>
    </div>
  </form>
</div>

<style>
  .chat-container {
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h3 {
    margin-bottom: 20px;
  }
  .chat-list {
    width: 450px;
    height: 300px;
    border: 1px solid #f7f7f7;
    background-color: #f7f7f7;
    border-radius: 6px;
    margin-bottom: 15px;
    overflow-y: auto;
    padding: 10px;
  }
  .message {
    width: 370px;
    padding: 8px;
    border: 1px solid #f7f7f7;
    background-color: #f7f7f7;
    border-radius: 8px;
  }
  .input-container {
    display: flex;
    gap: 10px;
  }
</style>

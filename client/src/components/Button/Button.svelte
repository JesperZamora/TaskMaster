<script>
  export let type = "primary";
</script>

<button class={type} on:click>
  <slot></slot>
</button>

<style>
  button {
    border: 0;
    padding: 5px 12px;
    border-radius: 6px;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.5px;
    cursor: pointer;
  }
  .primary {
    background-color: #45c496;
    color: #fff;
  }
  .secondary {
    background-color: #d91b42;
    color: #fff;
  }
  .tertiary {
    background-color: rgb(146, 202, 221);
    color: #fff;
  }
  .default {
    color: #222;
  }
</style>

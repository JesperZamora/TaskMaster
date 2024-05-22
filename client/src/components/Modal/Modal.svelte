<script>
  import { fade } from "svelte/transition";
  export let isShown = false;
</script>

{#if isShown}
  <div
    class="modal-container"
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 200 }}
  >
    <div class="modal">
      <slot></slot>
    </div>
  </div>
{/if}

<style>
  .modal-container {
    display: flex;
    justify-content: center;
    width: 50%;
    position: absolute;
  }
  .modal {
    padding: 10px;
    border-radius: 10px;
    width: 400px;
    background: #fff;
    position: absolute;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>

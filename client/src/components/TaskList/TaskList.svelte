<script>
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import TaskDetails from "../TaskDetails/TaskDetails.svelte";
  import TaskStore from "../../stores/taskStore";
</script>

{#if $TaskStore.length < 1}
  <p>You have currently no tasks ...</p>
{:else}
  <div class="task-list">
    {#each $TaskStore as task (task.id)}
      <div out:scale={{ duration: 500 }} animate:flip={{ duration: 600 }}>
        <TaskDetails {task} on:taskUpdate />
      </div>
    {/each}
  </div>
{/if}

<style>
  .task-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  p {
    font-weight: 500;
    font-size: 25px;
    text-align: center;
  }
</style>

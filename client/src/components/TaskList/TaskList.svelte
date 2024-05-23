<script>
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import TaskDetails from "../TaskDetails/TaskDetails.svelte";
  import TaskStore from "../../stores/taskStore";
  import Search from "../Search/Search.svelte";
  import TaskDateFilter from "../TaskDateFilter/TaskDateFilter.svelte";

  export let isTaskCompleted;

  let filteredTasks = $TaskStore;

  function handleTaskFound(event) {
    filteredTasks = event.detail.tasks;
  }

  function handleTasksFiltered(event) {
    filteredTasks = event.detail.tasks;
  }
</script>

<Search tasks={$TaskStore} on:taskFound={handleTaskFound} />
<TaskDateFilter tasks={$TaskStore} on:tasksFiltered={handleTasksFiltered} />

{#if filteredTasks.length < 1}
  <p>You have currently no tasks ...</p>
{:else}
  <div class="task-list">
    {#each filteredTasks as task (task.id)}
      {#if task.isCompleted === isTaskCompleted}
        <div out:scale={{ duration: 500 }}>
          <TaskDetails {task} on:taskUpdate />
        </div>
      {/if}
    {/each}
  </div>
{/if}

<!-- animate:flip={{ duration: 600 }} -->

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

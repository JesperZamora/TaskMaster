<script>
  import TaskDetails from "../TaskDetails/TaskDetails.svelte";
  import TaskStore from "../../stores/taskStore";
  import Search from "../Search/Search.svelte";
  import TaskDateFilter from "../TaskDateFilter/TaskDateFilter.svelte";
  import { scale } from "svelte/transition";

  export let isTaskCompleted;

  let filteredTasks = $TaskStore;

  function handleTaskFound(event) {
    filteredTasks = event.detail.tasks;
  }

  function handleTasksFiltered(event) {
    filteredTasks = event.detail.tasks;
  }
</script>

<div class="filter-container">
  <div class="filter">
    <Search tasks={$TaskStore} on:taskFound={handleTaskFound} />
  </div>
  <div class="filter">
    <TaskDateFilter tasks={$TaskStore} on:tasksFiltered={handleTasksFiltered} />
  </div>
</div>

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
  .filter-container {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: centter;
    padding: 12px;
    margin-bottom: 20px;
    gap: 10px;
  }
  .filter {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

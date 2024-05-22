<script>
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import TaskDetails from "../TaskDetails/TaskDetails.svelte";
  import TaskStore from "../../stores/taskStore";
  import Search from "../Search/Search.svelte";

  export let isTaskCompleted;

  let filteredTasks = $TaskStore;

  function handleTaskFound(event) {
    filteredTasks = event.detail.tasks;
  }

  let fromDate;
  let toDate;
  
  $: if(fromDate && toDate) {
    calculateDate();
  }

  function calculateDate() {
    const dateA = new Date(fromDate).getTime();
    const dateB = new Date(toDate).getTime();
   
    filteredTasks = $TaskStore.filter((task) => {
      const taskDate = new Date(task.dueDate).getTime();
      return taskDate >= dateA && taskDate <= dateB;
    });
  }

  function clearDates() {
    fromDate = "";
    toDate = "";
    filteredTasks = $TaskStore;
  }
</script>

<Search tasks={$TaskStore} on:taskFound={handleTaskFound}/>

<div class="date-container">
  <div>
    <span>Due date from: </span><input class="date from-date" type="date" bind:value={fromDate}>
    <span>to: </span><input class="date" type="date" bind:value={toDate}>
    <button on:click={clearDates}>Clear</button>
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

  .date {
    border: none;
    padding: 5px;
    background-color: #f7f7f7;
    border-radius: 8px;
    margin-left: 8px;
  }
  .from-date {
    margin-right: 5px;
  }
  span {
    font-size: 15px;
    font-weight: 500;
  }
  .date-container {
    display: flex;
    justify-content: center;
    padding: 12px;
    margin-bottom: 20px;
  }
</style>

<script>
  import Button from "../Button/Button.svelte";
  import { createEventDispatcher } from "svelte";

  export let tasks;
  let filteredTasks = tasks;
  let dispatch = createEventDispatcher();

  let fromDate;
  let toDate;

  $: if (fromDate && toDate) {
    calculateDate();
  }

  function calculateDate() {
    const dateA = new Date(fromDate).getTime();
    const dateB = new Date(toDate).getTime();

    filteredTasks = tasks.filter((task) => {
      const taskDate = new Date(task.dueDate).getTime();
      return taskDate >= dateA && taskDate <= dateB;
    });
  }

  $: {
    dispatch("tasksFiltered", { tasks: filteredTasks });
  }

  function clearDates() {
    fromDate = "";
    toDate = "";
    filteredTasks = tasks;
    dispatch("tasksFiltered", { tasks: filteredTasks });
  }
</script>

<div class="date-container">
  <div>
    <span>Due date from:</span>
    <input class="date from-date" type="date" bind:value={fromDate} />
    <span>to:</span>
    <input class="date" type="date" bind:value={toDate} />
    <Button type="default" on:click={clearDates}>Clear</Button>
  </div>
</div>

<style>
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
  }
</style>

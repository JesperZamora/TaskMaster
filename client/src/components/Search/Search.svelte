<script>
  import { createEventDispatcher } from "svelte";
  
  let dispatch = createEventDispatcher();
  export let tasks = [];
  let searchWord = "";

  $: filteredTasks = tasks.filter(
    (task) =>
      task.title.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()) ||
      task.taskDescription
        .toLocaleLowerCase()
        .includes(searchWord.toLocaleLowerCase())
  );

  $: {
    dispatch("taskFound", { tasks: filteredTasks});
  }
</script>

<div class="search-container">
  <input
    id="search"
    name="search"
    type="text"
    placeholder="Search for task ..."
    bind:value={searchWord}
  />
</div>

<style>
  .search-container {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }
  input {
    padding: 8px 12px;
    font-size: 15px;
    border: none;
    border-radius: 6px;
    background-color: #f7f7f7;
    width: 400px;
  }
</style>

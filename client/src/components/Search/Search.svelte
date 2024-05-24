<script>
  import { createEventDispatcher } from "svelte";

  export let tasks = [];
  let searchWord = "";
  let dispatch = createEventDispatcher();
  $: filteredTasks = tasks.filter(
    (task) =>
      task.title.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()) ||
      task.taskDescription
        .toLocaleLowerCase()
        .includes(searchWord.toLocaleLowerCase()) ||
      task.tag.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase())
  );

  $: {
    dispatch("taskFound", { tasks: filteredTasks });
  }
</script>

<div class="search-container">
  <input
    id="search"
    name="search"
    type="search"
    placeholder="Search for task by title, description or tag..."
    maxlength="45"
    bind:value={searchWord}
  />
</div>

<style>
  .search-container {
    width: 100%;
    text-align: center;
  }
  input {
    padding: 6px 12px;
    font-size: 15px;
    border: none;
    border-radius: 6px;
    background-color: #f7f7f7;
    width: 340px;
  }
</style>

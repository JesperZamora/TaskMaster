<script>
  import Button from "../../Button/Button.svelte";
  import TaskStore from "../../../stores/taskStore";
  import toast from "svelte-french-toast";
  import { createEventDispatcher } from "svelte";
  import { tags } from "../../../stores/tagStore";
  import { fetchPut } from "../../../util/api";
  import { TASK_URL } from "../../../stores/generalStore";

  const todaysDate = new Date().toISOString().split("T")[0];

  const dispatch = createEventDispatcher();

  export let task;

  async function handleTaskUpdated() {
    const response = await fetchPut($TASK_URL, task);

    if (!response.error) {
      dispatch("taskUpdated");
      TaskStore.update((currentTasks) => {
        const taskList = currentTasks.filter(
          (currentTask) => currentTask.id !== task.id
        );
        return [response.data, ...taskList];
      });
      toast.success("Successfully updated task");
    } else {
      toast.error(response.message);
    }
  }

  function handleCancel() {
    dispatch("cancel");
  }
</script>

<div class="form-container">
  <form on:submit|preventDefault={handleTaskUpdated}>
    <h3>Update Task</h3>
    <div class="form-field">
      <label for="title">Title:</label>
      <input
        type="text"
        id="title"
        bind:value={task.title}
        placeholder="Buy fruit ..."
        required
        maxlength="45"
      />
    </div>
    <div class="form-field">
      <label for="taskDescription">Description:</label>
      <textarea
        name="taskDescription"
        id="taskDescription"
        placeholder="Bananas, avocado, apples ..."
        bind:value={task.taskDescription}
        required
        maxlength="280"
      />
    </div>
    <div class="input-group">
      <div class="form-field">
        <label for="dueDate"> Due date:</label>
        <input
          class="date"
          type="date"
          id="dueDate"
          bind:value={task.dueDate}
          min={todaysDate}
          required
        />
      </div>
      <div class="form-field">
        <label for="tag"> # Tag:</label>
        <select class="tag" id="tag" bind:value={task.tagId} required>
          <option value="" disabled>Choose tag</option>
          {#each $tags as tag (tag.id)}
            <option value={tag.id}>{tag.category}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="form-field">
      <div class="completed-container">
        <label class="label-completed" for="isCompleted">Completed:</label>
        <div class="input-completed">
          <input
            class="isCompleted"
            type="checkbox"
            id="isCompleted"
            bind:checked={task.isCompleted}
          />
        </div>
      </div>
    </div>

    <div class="btn-container update">
      <Button type={"primary"}>Submit Update</Button>
    </div>
  </form>
  <div class="btn-container cancel">
    <Button type={"default"} on:click={handleCancel}>Cancel</Button>
  </div>
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 100%;
  }
  h3 {
    margin-bottom: 20px;
    text-align: center;
  }
  .form-field {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
  }
  label {
    text-align: left;
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 8px;
  }
  input {
    border: 1px solid #f7f7f7;
    background-color: #f7f7f7;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 16px;
    width: 100%;
  }
  select {
    border: 1px solid #f7f7f7;
    background-color: #f7f7f7;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 16px;
    width: 100%;
  }
  .date {
    width: 100%;
  }
  .completed-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .label-completed {
    display: inline-block;
  }
  .input-completed {
    display: inline-block;
    align-self: flex-start;
  }
  input[type="checkbox"].isCompleted {
    margin-top: 4px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 5px;
    height: 16px;
    outline: none;
    cursor: pointer;
    border-radius: 4px;
    background-color: #e1da1233;
  }
  input[type="checkbox"].isCompleted:checked {
    background-color: #45c496;
  }
  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .btn-container {
    width: 95%;
    display: flex;
    flex-direction: column;
  }
  .update {
    margin-top: 15px;
    align-self: center;
  }
  .cancel {
    width: 90%;
    margin-bottom: 10px;
  }
  textarea {
    resize: none;
    border: 1px solid #f7f7f7;
    background-color: #f7f7f7;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 16px;
    width: 100%;
    height: 100px;
  }
  .input-group {
    display: flex;
    justify-content: space-between;
  }
</style>

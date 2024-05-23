<script>
  import Button from "../../Button/Button.svelte";
  import { createEventDispatcher } from "svelte";
  import TaskStore from "../../../stores/taskStore";
  import { fetchPut } from "../../../util/api";
  import { TASK_URL } from "../../../stores/generalStore";
  import toast from "svelte-french-toast";

  const dispatch = createEventDispatcher();

  export let task;

  async function handleTaskUpdated() {
    const reponse = await fetchPut($TASK_URL, task);
    if (reponse) {
      dispatch("taskUpdated", false);
      TaskStore.update((currentTasks) => {
        const taskList = currentTasks.filter(
          (currentTask) => currentTask.id !== task.id
        );
        return [reponse.data, ...taskList];
      });
      toast.success("Successfully updated task");
    } else {
      toast.error("Failed to update task");
    }
  }

  function handleCancel() {
    dispatch("cancel", false);
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
      />
    </div>
    <div class="form-field">
      <label for="taskDescription">Description:</label>
      <input
        type="text"
        id="taskDescription"
        bind:value={task.taskDescription}
        placeholder="Bananas, avocado, apples ..."
        required
      />
    </div>
    <div class="form-field">
      <label for="dueDate"> Due date:</label>
      <input
        class="date"
        type="date"
        id="dueDate"
        bind:value={task.dueDate}
        required
      />
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
    align-items: center;
    padding: 10px;
    width: 100%;
  }
  h3 {
    margin-bottom: 20px;
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
  .date {
    width: 50%;
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
  }
  .cancel {
    width: 90%;
    margin-bottom: 10px;
  }
</style>

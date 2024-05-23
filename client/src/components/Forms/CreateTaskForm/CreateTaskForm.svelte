<script>
  import Button from "../../Button/Button.svelte";
  import { TASK_URL } from "../../../stores/generalStore";
  import { fetchPost } from "../../../util/api";
  import { navigate } from "svelte-navigator";
  import toast from "svelte-french-toast";

  let taskFields = {
    title: "",
    taskDescription: "",
    dueDate: "",
    isCompleted: false,
  };

  async function handleSumbit() {
    const task = { ...taskFields };
    const response = await fetchPost($TASK_URL, task);

    if (response) {
      toast.success("Successfully created new task");
      taskFields.title = "";
      taskFields.taskDescription = "";
      taskFields.dueDate = "";
      navigate("/tasks");
    } else {
      toast.error("Failed to create task");
    }
  }

  function handleClear() {
    taskFields.title = "";
    taskFields.taskDescription = "";
    taskFields.dueDate = "";
  }
</script>

<div class="form-container">
  <form on:submit|preventDefault={handleSumbit}>
    <h3>Create Task</h3>
    <div class="form-field">
      <label for="title">Title:</label>
      <input
        type="text"
        id="title"
        bind:value={taskFields.title}
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
        bind:value={taskFields.taskDescription}
        required
        maxlength="280"
      />
    </div>
    <div class="form-field">
      <label for="dueDate"> Due date:</label>
      <input
        class="date"
        type="date"
        id="dueDate"
        bind:value={taskFields.dueDate}
        required
      />
    </div>
    <div class="btn-container submit">
      <Button type={"primary"}>Submit Task</Button>
    </div>
  </form>
  <div class="btn-container cancel">
    <Button type={"default"} on:click={handleClear}>Clear</Button>
  </div>
</div>

<style>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    width: 100%;
    margin-top: 20px;
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
  .submit {
    margin-top: 15px;
  }
  .cancel {
    width: 90%;
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
</style>

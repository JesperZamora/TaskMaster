<script>
  import Card from "../Card/Card.svelte";
  import Button from "../Button/Button.svelte";
  import TaskStore from "../../stores/taskStore";
  import { createEventDispatcher } from "svelte";
  import { fetchDelete } from "../../util/api";
  import { TASK_URL } from "../../stores/generalStore";
  import toast from "svelte-french-toast";

  const dispatch = createEventDispatcher();

  export let task;

  async function handleDelete(id) {
    const response = await fetchDelete($TASK_URL, { id });

    if (response) {
      TaskStore.update((currentTasks) => {
        return currentTasks.filter((task) => task.id !== id);
      });
      toast.success("Successfully deleted task!");
    } else {
      toast.error("Failed to delete task");
    }
  }

  function handleUpdate() {
    dispatch("taskUpdate", task);
  }
</script>

<Card isTaskCompleted={task.isCompleted}>
  <div class="task">
    <div class="task-title">
      <h3>{task.title}</h3>
    </div>
    <div class="task-description">
      <p>{task.taskDescription}</p>
    </div>
    <div class="task-creation">
      <p>Creation Date: {task.creationDate}</p>
    </div>
    <div class="task-due">
      <p>Due Date: {task.dueDate}</p>
    </div>
  </div>
  <div>
    <Button type="primary" on:click={handleUpdate}>Update</Button>
    <Button type="secondary" on:click={() => handleDelete(task.id)}
      >Delete</Button
    >
  </div>
</Card>

<style>
  .task {
    display: flex;
    flex-direction: column;
  }
  .task-title {
    font-size: 25px;
    margin-bottom: 10px;
  }
  .task-description {
    font-size: 17px;
    letter-spacing: 0.5px;
    margin-bottom: 15px;
    max-width: 400px;
  }
  .task-creation {
    font-weight: 500;
    color: #8d8d8d;
  }
  .task-due {
    font-weight: 500;
    margin-bottom: 15px;
    color: #8d8d8d;
  }
</style>

<script>
  import Card from "../Card/Card.svelte";
  import Button from "../Button/Button.svelte";
  import TaskStore from "../../stores/taskStore";
  import toast from "svelte-french-toast";
  import { createEventDispatcher } from "svelte";
  import { fetchDelete } from "../../util/api";
  import { TASK_URL } from "../../stores/generalStore";

  const dispatch = createEventDispatcher();

  export let task;

  async function handleDelete(id) {
    const response = await fetchDelete($TASK_URL, { id });

    if (!response.error) {
      TaskStore.update((currentTasks) => {
        return currentTasks.filter((task) => task.id !== id);
      });
      toast.success("Successfully deleted task!");
    } else {
      toast.error(response.message);
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
    <div class="task-bottom">
      <div>
        <div class="task-days">
          <p># tag: {task.tag}</p>
        </div>
        <div class="task-days">
          <p>Days: {task.days}</p>
        </div>
        <div class="task-due">
          <p>Due Date: {task.dueDate}</p>
        </div>
        <div class="task-creation">
          <p>Creation Date: {task.creationDate}</p>
        </div>
      </div>
      <div class="buttons-container">
        <Button type="primary" on:click={handleUpdate}>Update</Button>
        <Button type="secondary" on:click={() => handleDelete(task.id)}
          >Delete</Button
        >
      </div>
    </div>
  </div>
</Card>

<style>
  .task {
    display: flex;
    flex-direction: column;
  }
  .task-title {
    font-size: 17px;
    margin-bottom: 10px;
  }
  .task-description {
    font-size: 15px;
    letter-spacing: 0.5px;
    margin-bottom: 15px;
    width: 400px;
    height: 100px;
  }
  .task-creation {
    font-size: 12px;
    font-weight: 500;
    color: #8d8d8d;
  }
  .task-due {
    font-size: 12px;
    font-weight: 500;
    color: #8d8d8d;
  }
  .task-days {
    font-size: 12px;
    font-weight: 500;
    color: #8d8d8d;
  }
  .task-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: end;
  }
</style>

<script>
  import TaskList from "../../components/TaskList/TaskList.svelte";
  import TaskStore from "../../stores/taskStore";
  import Modal from "../../components/Modal/Modal.svelte";
  import UpdateTaskForm from "../../components/Forms/UpdateTaskForm/UpdateTaskForm.svelte";
  import { onMount } from "svelte";
  import { fetchGet } from "../../util/api";
  import { TASK_URL } from "../../stores/generalStore";
  import toast from "svelte-french-toast";
  import StatisticDetails from "../../components/StatisticDetails/StatisticDetails.svelte";

  let task;
  let isShown = false;

  onMount(async () => {
    const data = await fetchGet($TASK_URL);
    if (data) {
      TaskStore.set(data);
    } else {
      toast.error("Failed to retrieve data");
    }
  });

  function handleCancel(event) {
    isShown = event.detail;
  }

  function handleTaskUpdated(event) {
    isShown = event.detail;
  }

  function handleUpdate(event) {
    task = event.detail;
    isShown = !isShown;
  }
</script>

<div class="statistics-container">
  <StatisticDetails />
</div>

<div class="tasks-container">
  <div class="modal-container">
    <Modal {isShown}>
      <UpdateTaskForm
        {task}
        on:cancel={handleCancel}
        on:taskUpdated={handleTaskUpdated}
      />
    </Modal>
  </div>
  <h3>Completed tasks</h3>
  <div class="task-list">
    <TaskList on:taskUpdate={handleUpdate} isTaskCompleted={true} />
  </div>
</div>

<style>
  .modal-container {
    position: absolute;
    top: 100px;
  }
  .tasks-container {
    display: flex;
    flex-direction: column;
    align-content: center;
    padding: 14px;
    margin-top: 30px;
    align-items: center;
    position: relative;
  }
  .statistics-container {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
  h3 {
    text-align: center;
    border-bottom: 1px solid #f7f7f7;
    padding: 20px;
    width: 100%;
  }
  .task-list {
    margin-top: 40px;
  }
</style>

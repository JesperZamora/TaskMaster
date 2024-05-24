<script>
  import TaskList from "../../components/TaskList/TaskList.svelte";
  import TaskStore from "../../stores/taskStore";
  import Modal from "../../components/Modal/Modal.svelte";
  import toast from "svelte-french-toast";
  import UpdateTaskForm from "../../components/Forms/UpdateTaskForm/UpdateTaskForm.svelte";
  import { onMount } from "svelte";
  import { fetchGet } from "../../util/api";
  import { TASK_URL } from "../../stores/generalStore";
  import { TAG_URL } from "../../stores/generalStore";
  import { tags } from "../../stores/tagStore";

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

  onMount(async () => {
    const response = await fetchGet($TAG_URL);
    if (response) {
      tags.set(response);
    } else {
      toast.error("Failed to retrieve data");
    }
  });

  function handleCancel() {
    isShown = !isShown;
  }

  function handleTaskUpdated(event) {
    isShown = !isShown;
  }

  function handleUpdate(event) {
    task = event.detail;
    isShown = !isShown;
  }
</script>

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
  <TaskList on:taskUpdate={handleUpdate} isTaskCompleted={false} />
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
</style>

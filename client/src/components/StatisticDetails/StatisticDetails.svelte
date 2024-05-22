<script>
  import TaskStore from "../../stores/taskStore";
  import Card from "../Card/Card.svelte";

  $: tasksSum = $TaskStore.length;

  $: completionObject = $TaskStore.reduce(
    (count, task) => {
      if (task.isCompleted) {
        count.completed += 1;
      } else {
        count.notCompleted += 1;
      }
      return count;
    },
    { completed: 0, notCompleted: 0 }
  );

  $: completedPercent = (completionObject.completed / $TaskStore.length) * 100;
  $: notCompletedPercent =
    (completionObject.notCompleted / $TaskStore.length) * 100;
</script>

<Card>
  <div class="info-container">
    <h3>Tasks in total: <p>{tasksSum}</p></h3>
    <div class="task-bar">
      <div class="bar bar-one" style="width: {completedPercent}%"></div>
      <div><p>Completed:</p> <span>{completionObject.completed}</span></div>
    </div>

    <div class="task-bar">
      <div class="bar bar-two" style="width: {notCompletedPercent}%"></div>
      <div>
        <p>Not completed:</p> <span>{completionObject.notCompleted}</span></div
      >
    </div>
  </div>
</Card>

<style>
  h3 {
    color: #222;
  }
  .info-container {
    width: 420px;
  }
  .task-bar {
    background: #ebebeb;
    margin: 10px auto;
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;
    border-radius: 8px;
  }
  .bar {
    height: 100%;
    position: absolute;
    box-sizing: border-box;
    border-radius: 8px;
  }
  .bar-one {
    background-color: rgb(69, 196, 150, 0.2);
  }
  .bar-two {
    background-color: rgba(243, 235, 9, 0.2);
  }
  p {
    display: inline-block;
    padding: 8px;
    font-weight: 500;
  }
</style>

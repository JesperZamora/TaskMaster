<script>
  export let isTaskCompleted = false;
</script>

<div class="card" class:completed={isTaskCompleted}>
  <slot></slot>
</div>

<style>
  .card {
    background-color: #fff;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    max-width: 500px;
  }
  .card.completed {
    background-color: #f7f7f7;
  }
</style>

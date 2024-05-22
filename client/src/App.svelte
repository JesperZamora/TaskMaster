<script>
  import Header from "./components/Header/Header.svelte";
  import Footer from "./components/Footer/Footer.svelte";
  import TaskPage from "./pages/TaskPage/TaskPage.svelte";
  import StatisticsPage from "./pages/StatisticsPage/StatisticsPage.svelte";
  import ChatPage from "./pages/ChatPage/ChatPage.svelte";
  import CreateTaskPage from "./pages/CreateTaskPage/CreateTaskPage.svelte";
  import { Router, Link, Route, navigate } from "svelte-navigator";
  import { user } from "./stores/userStore";
  import LoginForm from "./components/Forms/LoginForm/LoginForm.svelte";
  import LogoutButton from "./components/LogoutButton/LogoutButton.svelte";
  import { Toaster } from "svelte-french-toast";

  let isLoggedIn = false;

  $: {
    isLoggedIn = $user !== null;
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    } else {
      navigate("/tasks");
    }
  }
</script>

<Header />
<main>
  <Router primary={false}>
    <nav>
      {#if isLoggedIn}
        <div class="links-container">
          <div class="link"><Link to="/tasks">Tasks</Link></div>
          <div class="link"><Link to="/create">Create task</Link></div>
          <div class="link"><Link to="/statistics">Statistics</Link></div>
          <div class="link"><Link to="/chat">Chat</Link></div>
          <div>
            <LogoutButton />
          </div>
        </div>
      {/if}
    </nav>
    <div>
      {#if isLoggedIn}
        <Route path="/tasks" primary={true}>
          <TaskPage />
        </Route>
        <Route path="/create">
          <CreateTaskPage />
        </Route>
        <Route path="/statistics">
          <StatisticsPage />
        </Route>
        <Route path="/chat">
          <ChatPage />
        </Route>
      {:else}
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="*">
          <LoginForm />
        </Route>
      {/if}
    </div>
    <Toaster />
  </Router>
</main>
<Footer />

<style>
  main {
    margin: 40px auto;
    max-width: 960px;
  }
  nav {
    width: 100%;
  }
  .links-container {
    display: flex;
    justify-content: center;
    gap: 30px;
  }
  .link {
    font-size: 20px;
    font-weight: 500;
  }
</style>

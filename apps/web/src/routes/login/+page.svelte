<script lang="ts">
  // TODO: deal with this ignore comment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //import db from "../db/db.js"
  import NavBar from "../../components/NavBar.svelte"
  import Button from "lluis/DeprecatedButton.svelte"
  import FormField from "lluis/FormField.svelte"
  import {handleLogin} from "./_logic"

  import { page } from '$app/state';
  let username = page.data.username
  let password = page.data.password
  let error: string | null = page.data.error
</script>

<svelte:head>
  <title>Log in - LibreLingo</title>
</svelte:head>

<NavBar />

<section class="section">
  <div class="container">
    <form on:submit|preventDefault="{handleLogin}">
      <h2 class="is-size-2">Log in</h2>

      <FormField
        name="Username"
        icon="user"
        id="username"
        bind:value="{username}"
      />

      <FormField
        name="Password"
        icon="lock"
        id="password"
        type="password"
        bind:value="{password}"
      />

      {#if error !== null}
        <p class="help is-danger">{error}</p>
      {/if}

      <Button on:click="{handleLogin}" type="submit">Log in</Button>
    </form>
  </div>
</section>

<script lang="ts">
  // TODO: deal with this ignore comment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //import db from "../../db/db.js"
  import NavBar from "../../components/NavBar.svelte"
  import Button from "lluis/DeprecatedButton.svelte"
  import FormField from "lluis/FormField.svelte"
  import { _ } from "svelte-i18n"
  import { page } from '$app/state';
  import {handleSignUp} from "./_logic"
  import type { ErrorsType } from "types/types"

  let username = page.data.username
  let email = page.data.email
let password = page.data.password
let password_confirmation = page.data.password_confirmation
let license_accepted = page.data.license_accepted
let errors: ErrorsType = page.data.errors
let loading = page.data.loading
</script>

<svelte:head>
  <title>Sign up - LibreLingo</title>
  <meta name="description" content="{$_('sign-up.meta.description')}" />
</svelte:head>

<NavBar />

<section class="section">
  <div class="container">
    <form on:submit|preventDefault="{handleSignUp}">
      <h2 class="is-size-2">Sign up</h2>

      <FormField
        name="Username"
        icon="user"
        id="username"
        formStatus="{errors}"
        bind:value="{username}"
      />
      <FormField
        name="Email"
        icon="envelope"
        id="email"
        formStatus="{errors}"
        bind:value="{email}"
      />
      <FormField
        name="Password"
        icon="lock"
        id="password"
        type="password"
        formStatus="{errors}"
        bind:value="{password}"
      />
      <FormField
        name="Repeat password"
        icon="lock"
        id="password_confirmation"
        type="password"
        formStatus="{errors}"
        bind:value="{password_confirmation}"
      />

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input
              type="checkbox"
              name="license"
              id="license"
              bind:checked="{license_accepted}"
            />
            I agree to the
            <a href="/tos">Terms and Conditions</a>
            and the
            <a href="/license">GNU Affero General Public License</a>
          </label>
        </div>
        {#if errors["license"] != null}
          <p class="help is-danger">{errors["license"]}</p>
        {/if}
      </div>

      {#if errors._form != null}
        <p class="help is-danger">{errors._form}</p>
      {/if}

      <Button
        on:click="{handleSignUp}"
        loading="{loading}"
        asHref="/sign-up-success"
        type="submit"
      >
        Sign up
      </Button>
    </form>
  </div>
</section>

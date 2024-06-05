<script lang="ts">
  import { codeToHtml } from "shiki";
  let { language = "", filename = "", code = "N/A" } = $props();
</script>

<div class="code-block">
  {#await codeToHtml( code, { lang: language, theme: "vitesse-dark" } ) then html}
    {@html html}
  {/await}
</div>

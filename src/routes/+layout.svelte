<script lang="ts">
	import "uno.css";
	import "@unocss/reset/tailwind-compat.css";
	import { StyleFromScheme } from "m3-svelte";
	import "./styles.css";
	import { fly } from "svelte/transition";
	import { page } from "$app/stores";
	let pageData = $derived($page.url.pathname);
	let history = $state(0);
	let x = $state(200);

	$effect(() => {
		window.addEventListener("popstate", (e) => {
			const historyState = e.state["sveltekit:history"];
			
			if (historyState <= history || history === 0) {
				console.log('They probably clicked a back button');
				x = -200;
			} else {
				console.log('They probably clicked a forward button');
				x = 200;
			}

			history = historyState;

			setTimeout(() => {
				console.log('Resetting for in-app page router');
				x = 200
			}, 250)
		});
	});
</script>

<StyleFromScheme
	lightScheme={{
		primary: 4282474385,
		onPrimary: 4294967295,
		primaryContainer: 4292338687,
		onPrimaryContainer: 4278197054,
		inversePrimary: 4289382399,
		secondary: 4283850353,
		onSecondary: 4294967295,
		secondaryContainer: 4292535033,
		onSecondaryContainer: 4279442475,
		tertiary: 4285551989,
		onTertiary: 4294967295,
		tertiaryContainer: 4294629629,
		onTertiaryContainer: 4280816430,
		error: 4290386458,
		onError: 4294967295,
		errorContainer: 4294957782,
		onErrorContainer: 4282449922,
		background: 4294572543,
		onBackground: 4279835680,
		surface: 4294572543,
		onSurface: 4279835680,
		surfaceVariant: 4292928236,
		onSurfaceVariant: 4282664782,
		inverseSurface: 4281217078,
		inverseOnSurface: 4293980407,
		outline: 4285822847,
		outlineVariant: 4291086032,
		shadow: 4278190080,
		scrim: 4278190080,
		surfaceDim: 4292467168,
		surfaceBright: 4294572543,
		surfaceContainerLowest: 4294967295,
		surfaceContainerLow: 4294177786,
		surfaceContainer: 4293783028,
		surfaceContainerHigh: 4293388526,
		surfaceContainerHighest: 4293059305,
		surfaceTint: 4282474385,
	}}
	darkScheme={{
		primary: 4289382399,
		onPrimary: 4278923359,
		primaryContainer: 4280829815,
		onPrimaryContainer: 4292338687,
		inversePrimary: 4282474385,
		secondary: 4290692828,
		onSecondary: 4280824129,
		secondaryContainer: 4282271577,
		onSecondaryContainer: 4292535033,
		tertiary: 4292721888,
		onTertiary: 4282329156,
		tertiaryContainer: 4283907676,
		onTertiaryContainer: 4294629629,
		error: 4294948011,
		onError: 4285071365,
		errorContainer: 4287823882,
		onErrorContainer: 4294957782,
		background: 4279309080,
		onBackground: 4293059305,
		surface: 4279309080,
		onSurface: 4293059305,
		surfaceVariant: 4282664782,
		onSurfaceVariant: 4291086032,
		inverseSurface: 4293059305,
		inverseOnSurface: 4281217078,
		outline: 4287533209,
		outlineVariant: 4282664782,
		shadow: 4278190080,
		scrim: 4278190080,
		surfaceDim: 4279309080,
		surfaceBright: 4281809214,
		surfaceContainerLowest: 4278980115,
		surfaceContainerLow: 4279835680,
		surfaceContainer: 4280164389,
		surfaceContainerHigh: 4280822319,
		surfaceContainerHighest: 4281546042,
		surfaceTint: 4289382399,
	}}
/>

{#key pageData}
	<div in:fly={{ x }} class="h-full w-full">
		<slot />
	</div>
{/key}

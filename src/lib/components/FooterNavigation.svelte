<script lang="ts">
	import { page } from '$app/stores';
	import HiveIcon from '$lib/icons/hive.svelte';
	import DashboardIcon from '$lib/icons/DashboardIcon.svelte';
	import AlarmIcon from '$lib/icons/AlarmIcon.svelte';
	import SettingIcon from '$lib/icons/SettingIcon.svelte';

	const navItems = [
		{ title: 'Hives', path: '/', component: HiveIcon },
		{ title: 'Dashboard', path: '/dashboard', component: DashboardIcon },
		{ title: 'Alarms', path: '/alarms', component: AlarmIcon },
		{ title: 'Settings', path: '/settings', component: SettingIcon }
	];
</script>

<footer>
	{#each navItems as nav}
		<a
			href={nav.path}
			class="item"
			aria-current={$page.url.pathname == nav.path ? 'page' : undefined}
		>
			<div class="icon">
				<svelte:component this={nav.component} />
			</div>

			<span class="title">{nav.title}</span>
		</a>
	{/each}
</footer>

<style lang="scss">
	footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: var(--highlight);
		display: flex;
		justify-content: space-evenly;

		a.item {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			cursor: pointer;
			padding: 0.6rem 0.5rem 0.2rem;
			color: var(--color);
			font-size: 0.8rem;
			transition: all 200ms ease;
			will-change: font-weight;

			&:hover {
				background-color: var(--background-60);
			}

			.icon {
				width: 20px;
				height: 20px;
				fill: var(--color);
				transition: inherit;
				margin-bottom: 0.2rem;
			}

			&::after {
				transition: inherit;
				content: '';
				position: absolute;
				top: 0;
				width: 50%;
				height: 3px;
				background-color: var(--brand);
				opacity: 0;
			}

			&[aria-current='page'] {
				color: var(--brand);
				font-weight: bold;
				letter-spacing: -0.3px;

				.icon {
					fill: var(--brand) !important;
				}

				&::after {
					opacity: 1;
				}
			}
		}
	}

	:global(a.item[aria-current='page'] svg) {
		fill: var(--brand) !important;
	}
</style>

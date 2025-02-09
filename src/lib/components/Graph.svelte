<script lang="ts">
	import { onMount } from 'svelte'
	import Chart from 'chart.js/auto';
	import { Filler } from 'chart.js'

	Chart.register(
		Filler
	)

	export let date: string;

	let chart: Chart;
	let chartElement: HTMLCanvasElement;
	let chartHeight = 0;

	const data = [
    { year: 2010, count: (Math.floor(10 * (Math.random() * 30) + 10)) / 10 },
    { year: 2011, count: (Math.floor(10 * (Math.random() * 30) + 20)) / 10 },
    { year: 2012, count: (Math.floor(10 * (Math.random() * 30) + 15)) / 10 },
    { year: 2013, count: (Math.floor(10 * (Math.random() * 30) + 25)) / 10 },
    { year: 2014, count: (Math.floor(10 * (Math.random() * 30) + 22)) / 10 },
    { year: 2015, count: (Math.floor(10 * (Math.random() * 30) + 30)) / 10 },
    { year: 2016, count: (Math.floor(10 * (Math.random() * 30) + 28)) / 10 },
  ];

 function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

	function createLineBackgroundGradient(hex: string, element: HTMLCanvasElement) {
		const context = element.getContext("2d");
		if (context == null) return

		// const gradient = context.createLinearGradient(0, 0, 0, context.canvas.height);
    const gradient = context.createLinearGradient(0, 0, 0, chartHeight * 0.9 || 180);
    const c = hexToRgb(hex);
    if (c == null) return;

    gradient.addColorStop(0.2, `rgb(${c.r}, ${c.g}, ${c.b}, 0.6)`);
    gradient.addColorStop(1, `rgb(${c.r}, ${c.g}, ${c.b}, 0)`);
    return gradient;
  }

	function mountGraph() {
		const c = randomOfList(colors);

		chart = new Chart(chartElement, {
			type: 'line',
			data: {
				labels: data.map(row => row.year),
				datasets: [
					{
						label: 'Acquisitions by year',
						data: data.map(row => row.count),
						fill: true,
						backgroundColor: createLineBackgroundGradient(c, chartElement),
					}
				]
			},
			options: {
				plugins: {
					legend: {
						display: false,
					}
				},
				scales: {
				},
				elements: {
					line: { 
						borderJoinStyle: 'round',
						borderCapStyle: 'round',
						tension: 0.3,
						borderColor: c
					},
					point: {
						radius: 4,
						backgroundColor: c
					}
				}
			}
		});

		if (chartHeight == 0) {
			chartHeight = chartElement.getBoundingClientRect()?.height || 0;
			console.log("chartHeight:", chartHeight)
			chart.destroy()
			mountGraph()
		}
	}

	onMount(() => mountGraph())

	// const colors = ["#ADBCA5", "#E8B9AB", "#E09891", "#CB769E"];
	const dataTypes = ["Temperature", "Pressure", "Weight", "Activity"];
	const colors = [
		"#FFA14C", // orange
		"#FFE160", // yellow
		"#AEF78E", // light green
		"#7CE64B", // green
		"#F46036", // orange - 2
		"#A6D9F7", // light blue
		"#5146EB", // blue
		"#EA038D", // pink
		"#832ED5", // purple
	];

	const randomOfList = (list: string[]) => list[Math.floor(Math.random() * list.length)]
	const dataType = randomOfList(dataTypes)
	const lastValue = data[data.length - 1].count
</script>


<div class="graph-container">
	<div class="heading">
		<div class="metric">
			<span>{ dataType }</span>
			<b>{ lastValue }</b>
		</div>

		<span>{ date } days</span>
	</div>

	<div class="graph">
		<canvas bind:this={chartElement} />
	</div>

</div>

<style lang="scss">

	.graph-container {
		display: flex;
		flex-direction: column;
		border-radius: 1rem;
		background-color: var(--highlight);
		padding: 0.75rem 1rem;

		.heading {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.metric {
				display: flex;
				flex-direction: column;

				b {
					font-size: 3rem;
					font-weight: 900;
				}
			}
		}

		.graph {
			width: 100%;
		}
	}

</style>

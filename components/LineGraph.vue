<template>
    <div
        ref="chartContainer"
        class="w-full h-full min-h-[300px]"
    >
        <svg
            ref="chart"
            class="w-full h-full"
        ></svg>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as d3 from 'd3';

const props = defineProps({
    data: {
        type: Array,
        default: () => [
            { date: '2024-03-13', value: 3, isError: false },
            { date: '2024-03-20', value: 5, isError: true },
            { date: '2024-04-01', value: 2, isError: false },
            { date: '2024-04-15', value: 6, isError: true },
            { date: '2025-04-18', value: 4, isError: false }
        ]
    },
    maxScale: {
        type: Number,
        default: 10
    }
});

const chartContainer = ref(null);
const chart = ref(null);
let resizeObserver = null;

const drawChart = () => {
    if (!chartContainer.value || !chart.value) return;

    // Clear previous chart
    d3.select(chart.value).selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = chartContainer.value.clientWidth - margin.left - margin.right;
    const height = chartContainer.value.clientHeight - margin.top - margin.bottom;

    const svg = d3.select(chart.value)
        .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3.scaleTime()
        .domain(d3.extent(props.data, d => new Date(d.date)))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, props.maxScale])
        .range([height, 0]);

    // Line generator
    const line = d3.line()
        .x(d => x(new Date(d.date)))
        .y(d => y(d.value))
        .curve(d3.curveMonotoneX);

    // Add the X axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // Add the Y axis
    svg.append('g')
        .call(d3.axisLeft(y));

    // Add the line path
    svg.append('path')
        .datum(props.data)
        .attr('fill', 'none')
        .attr('stroke', 'var(--color-primaryNormal)')
        .attr('stroke-width', 2)
        .attr('d', line);

    // Add dots
    svg.selectAll('.dot')
        .data(props.data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => x(new Date(d.date)))
        .attr('cy', d => y(d.value))
        .attr('r', 5)
        .style('fill', d => d.isError ? 'var(--color-dangerNormal)' : 'var(--color-primaryLight)')
        .style('stroke', d => d.isError ? 'var(--color-dangerDark)' : 'var(--color-primaryNormal)')
        .style('stroke-width', 2);

    // Add hover effects
    const tooltip = d3.select(chartContainer.value)
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)
        .style('position', 'absolute')
        .style('background-color', 'white')
        .style('border', '1px solid var(--color-outline_grayNormal)')
        .style('border-radius', '4px')
        .style('padding', '8px')
        .style('pointer-events', 'none');

    svg.selectAll('.dot')
        .on('mouseover', (event, d) => {
            d3.select(event.currentTarget)
                .transition()
                .duration(200)
                .attr('r', 7);

            tooltip.transition()
                .duration(200)
                .style('opacity', .9);

            tooltip.html(`Date: ${new Date(d.date).toLocaleDateString()}<br/>Value: ${d.value}`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', (event) => {
            d3.select(event.currentTarget)
                .transition()
                .duration(200)
                .attr('r', 5);

            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
        });
};

// Handle resize
onMounted(() => {
    resizeObserver = new ResizeObserver(() => {
        drawChart();
    });

    if (chartContainer.value) {
        resizeObserver.observe(chartContainer.value);
    }

    drawChart();
});

onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect();
    }
});

// Watch for data changes
watch(() => props.data, () => {
    drawChart();
}, { deep: true });

watch(() => props.maxScale, () => {
    drawChart();
});
</script>

<style scoped>
.tooltip {
    font-size: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
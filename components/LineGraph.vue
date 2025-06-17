<template>
    <div
        ref="chartContainer"
        class="w-full h-full overflow-hidden"
    >
        <svg
            ref="chart"
            class="w-full h-full"
        ></svg>
    </div>
</template>

<script setup>
import * as d3 from 'd3';

const { x
    , y
    , sourceType
} = useMouse

const props = defineProps({
    data: {
        type: Array,
        default: () => [
            { date: '2024-03-13', value: 3, painDegrees: [5, 7] },
            { date: '2024-03-20', value: 5, painDegrees: [4, 8, 9] },
            { date: '2024-04-01', value: 2, painDegrees: [3, 6] },
            { date: '2024-04-02', value: 6, painDegrees: [30, 60] },
            { date: '2024-04-15', value: 6, painDegrees: [7, 8] },
            { date: '2025-04-18', value: 4, painDegrees: [5, 9] }
        ]
    },
    maxScale: {
        type: Number,
        default: 10
    },
    unit: {
        type: String,
        default: ''
    }
});

const chartContainer = ref(null);
const chart = ref(null);
let resizeObserver = null;

const drawChart = () => {
    if (!chartContainer.value || !chart.value) return;

    d3.select(chart.value).selectAll('*').remove();

    const margin = { top: 20, right: 40, bottom: 30, left: 40 };
    const width = chartContainer.value.clientWidth - margin.left - margin.right;
    const height = chartContainer.value.clientHeight - margin.top - margin.bottom;

    const svg = d3.select(chart.value)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const defs = svg.append('defs');

    const pattern = defs.append('pattern')
        .attr('id', 'dot-pattern')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', 10)
        .attr('height', 10);

    pattern.append('circle')
        .attr('cx', 5)
        .attr('cy', 5)
        .attr('r', 0.8)
        .attr('fill', '#C0C0C0')
        .attr('opacity', 0.8);

    const gradient = defs.append('linearGradient')
        .attr('id', 'area-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0)
        .attr('y1', height)
        .attr('x2', 0)
        .attr('y2', 0);

    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', 'var(--color-primaryLight)')
        .attr('stop-opacity', 0.1);

    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', 'var(--color-primaryLight)')
        .attr('stop-opacity', 0.8);

    const plateauWidth = 20;

    const x = d3.scaleTime()
        .domain(d3.extent(props.data, d => new Date(d.date)))
        .range([0, width - plateauWidth / 2]);

    const y = d3.scaleLinear()
        .domain([0, props.maxScale])
        .range([height, 0]);

    // Create deviated data for the second line
    const createDeviatedData = (data) => {
        return data.map(d => ({
            ...d,
            value: Math.max(0, d.value * 0.25)
        }));
    };

    const deviatedData = createDeviatedData(props.data);
    const createPlateauData = (data) => {
        const plateauData = [];

        data.forEach((d, i) => {
            const xPos = x(new Date(d.date));
            const yPos = y(d.value);

            if (i === 0) {
                plateauData.push({ x: xPos, y: yPos, date: d.date, value: d.value });
            } else {
                plateauData.push({ x: xPos - plateauWidth / 2, y: yPos, date: d.date, value: d.value });
                plateauData.push({ x: xPos + plateauWidth / 2, y: yPos, date: d.date, value: d.value });
            }
        });

        return plateauData;
    };

    const plateauData = createPlateauData(props.data);

    const line = d3.line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(d3.curveLinear);

    const createCustomPath = (data) => {
        let pathData = '';

        data.forEach((d, i) => {
            const xPos = x(new Date(d.date));
            const yPos = y(d.value);

            if (i === 0) {
                pathData += `M ${xPos} ${yPos}`;
            } else {
                const prevXPos = x(new Date(data[i - 1].date));
                const prevYPos = y(data[i - 1].value);

                pathData += ` L ${prevXPos + plateauWidth / 2} ${prevYPos}`;
                pathData += ` L ${xPos - plateauWidth / 2} ${yPos}`;
                pathData += ` L ${xPos + plateauWidth / 2} ${yPos}`;
            }
        });

        return pathData;
    };


    svg.append('rect')
    svg.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'url(#dot-pattern)')
        .attr('stroke', 'var(--color-outline_grayNormal)')
        .attr('stroke-width', 1)
        .attr('rx', 10)
        .attr('ry', 10);

    const area = d3.area()
        .x(d => x(new Date(d.date)))
        .y0(height)
        .y1(d => y(d.value))
        .curve(d3.curveLinear);

    svg.append('g')
        .style("opacity", 0.5)
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%d/%m/%y')).tickSize(0))
        .call(g => g.selectAll('.domain').remove());

    svg.append('g')
        .style("opacity", 0.5)
        .call(d3.axisLeft(y).tickSize(0))
        .call(g => g.selectAll('.domain').remove());

    const today = new Date();
    const todayX = x(today);

    if (todayX >= 0 && todayX <= width) {
        svg.append('line')
            .attr('x1', todayX)
            .attr('y1', 0)
            .attr('x2', todayX)
            .attr('y2', height)
            .attr('stroke', 'var(--color-secondaryNormal)')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '3,3')
            .style('opacity', 0.7);
    }
    const createCustomArea = () => {
        let areaData = '';

        props.data.forEach((d, i) => {
            const xPos = x(new Date(d.date));
            const yPos = y(d.value);

            if (i === 0) {
                areaData += `M ${xPos} ${height}`;
                areaData += ` L ${xPos} ${yPos}`;
            } else {
                const prevXPos = x(new Date(props.data[i - 1].date));
                const prevYPos = y(props.data[i - 1].value);

                areaData += ` L ${prevXPos + plateauWidth / 2} ${prevYPos}`;
                areaData += ` L ${xPos - plateauWidth / 2} ${yPos}`;
                areaData += ` L ${xPos + plateauWidth / 2} ${yPos}`;
            }

            if (i === props.data.length - 1) {
                areaData += ` L ${xPos + plateauWidth / 2} ${height}`;
                areaData += ` Z`;
            }
        });

        return areaData;
    };



    svg.append('path')
        .attr('d', createCustomArea())
        .attr('fill', 'url(#area-gradient)');

    // Draw the main line
    svg.append('path')
        .attr('d', createCustomPath(props.data))
        .attr('fill', 'none')
        .attr('stroke', 'var(--color-primaryNormal)')
        .attr('stroke-width', 2);

    // Draw the second deviated line (much lower)
    svg.append('path')
        .attr('d', createCustomPath(deviatedData))
        .attr('fill', 'none')
        .attr('stroke', 'var(--color-tertiaryNormal)')
        .attr('stroke-width', 2);


    if (props.data.length > 0) {
        const lastDataPoint = props.data[props.data.length - 1];
        const lastX = x(new Date(lastDataPoint.date));
        const lastY = y(lastDataPoint.value);

        svg.append('line')
            .attr('x1', 0)
            .attr('y1', lastY)
            .attr('x2', width)
            .attr('y2', lastY)
            .attr('stroke', 'var(--color-tertiaryNormal)')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', '5,5')
            .style('opacity', 0.8);
    }
    props.data.forEach(d => {
        if (d.painDegrees && d.painDegrees.length > 0) {
            d.painDegrees.forEach(pain => {
                svg.append('circle')
                    .attr('cx', x(new Date(d.date)))
                    .attr('cy', y(pain))
                    .attr('r', 4)
                    .style('fill', 'var(--color-dangerNormal)')
                    .style('stroke', 'none')
                    .style('opacity', 1);
            });
        }
    });

    const tooltip = d3.select(chartContainer.value)
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)
        .style('position', 'absolute')
        .style('pointer-events', 'none');

    const cursorLine = svg.append('line')
        .attr('class', 'cursor-line')
        .attr('y1', 0)
        .attr('y2', height)
        .style('opacity', 0)
        .style('stroke', 'var(--color-secondaryNormal)')
        .style('stroke-width', '1px')


    const overlay = svg.append('rect')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'none')
        .style('pointer-events', 'all');

    overlay.on('mousemove', function (event) {
        const mouseX = d3.pointer(event)[0];

        cursorLine
            .attr('x1', mouseX)
            .attr('x2', mouseX)
            .style('opacity', 1);

        const bisect = d3.bisector(d => new Date(d.date)).left;
        const x0 = x.invert(mouseX);
        const i = bisect(props.data, x0, 1);
        const d0 = props.data[i - 1];
        const d1 = props.data[i];
        const d = x0 - new Date(d0.date) > new Date(d1?.date) - x0 ? d1 : d0;

        if (d) {
            const painDegreesText = d.painDegrees && d.painDegrees.length > 0
                ? `<br/>Schmerzpunkte (Grad): ${d.painDegrees.join('°, ')}°`
                : '';

            tooltip
                .style('opacity', 1)
                .html(`<div style="background: white; border: 1px solid var(--color-outline_grayNormal); border-radius: 1rem; padding: 1rem; text-align: right;">Datum: ${new Date(d.date).toLocaleDateString()}<br/>Wert: ${d.value}${props.unit ? ` ${props.unit}` : ''}${painDegreesText}</div>`)
                .style('left', '0px')
                .style('top', '0px')
                .style('transform', `translate(${event.pageX - 220}px, ${event.pageY - 120}px)`);
        }
    })
        .on('mouseleave', () => {
            cursorLine.style('opacity', 0);
            tooltip.style('opacity', 0);
        });
};

let resizeTimeout;
const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (chartContainer.value && chart.value) {
            drawChart();
        }
    }, 100);
};

onMounted(() => {
    resizeObserver = new ResizeObserver(handleResize);

    if (chartContainer.value) {
        resizeObserver.observe(chartContainer.value);
    }

    drawChart();
});

onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect();
    }
    clearTimeout(resizeTimeout);
});

watch(() => props.data, () => {
    drawChart();
}, { deep: true });

watch(() => props.maxScale, () => {
    drawChart();
});
</script>

<style scoped>
.tooltip {
    background-color: white;
    border: 1px var(--color-outline_grayNormal) solid;
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-size: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}
</style>
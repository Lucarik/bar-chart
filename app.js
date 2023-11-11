const container = document.getElementById('chart');
const  margin = {top: 30, right: 30, bottom: 70, left: 60};
const w = 700 - margin.left - margin.right;
const h = 500 - margin.top - margin.bottom;
const padding = 40;

container.innerHTML = "h"
console.log("hi");
const mouseover = function() {
    d3.select(this).style("fill", "rgba(200,250,250,.7)");
    tooltip.style("opacity", 1);
}
const mousemove = function(data) {
    //console.log(`Date: ${data[0]} GDP: $${data[1]} B`);
    const text = d3.select('.tooltip-text');
    text.text(`Date: ${data[0]} GDP: ${data[1]}`);
    const [x, y] = d3.mouse(this);
    d3.select('.tooltip').attr("transform", "rotate(90deg");
    tooltip.attr("transform", `translate(${x}, ${y})`);
};
const tooltip = d3.select("#chart")
    .append("g")
        .attr("class", "tooltip")
        .attr("x", 10)
        .attr("y", 10)
        .append("text")
            .attr("class", "tooltip-text")
            .text("oggg")
            
const svg = d3.select("body")
    .append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

async function getData() {
    try {
        return fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
            .then(async (response) => await response.json())
    } catch(e) {
        return e;
    }
}

(async function(){
    let dataset = await getData();
    let title = dataset.source_name;
    let yAxisTitle = dataset.name.substring(0,22);
    dataset = dataset.data;
    
    let barw = w / dataset.length;
    svg.append('text')
        .attr("class", "text")
        .attr('transform', 'rotate(-90)')
        .attr('x', -250)
        .attr('y', 30)
        .text(yAxisTitle);
    svg.append('text')
        .attr("class", "text")
        .style("font-size", "20px")
        .attr('x', 200)
        .attr('y', 30)
        .text(title);
    // Create X scale
    //.domain([d3.min(dataset, (d) => new Date(d[0])), d3.max(dataset, (d) => new Date(d[0]))])
    const x = d3.scaleTime()
        .domain([d3.min(dataset, (d) => new Date(d[0])), d3.max(dataset, (d) => new Date(d[0]))])
        .range([0, w])
    svg.append("g")
        .attr("transform", "translate(0," + h + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")
            .style("fill", "white");

    const y = d3.scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[1])])
        .range([h, 0]);
    svg.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
            .style("fill", "white");
    
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
            .attr("x", d => x(new Date(d[0])))
            .attr("y", d => y(d[1]))
            .attr("width", barw)
            .attr("height", d => h - y(d[1]))
            .attr("fill", "aliceblue")
            .on("mouseover", mouseover)
            .on("mouseout", function(d) {
                d3.select(this).style("fill", "aliceblue");
            })
            .on("mousemove", mousemove)
            .append("title")
                .text(d => d);
            
    

    // Create and append X and Y axis
    // const xAxis = d3.axisBottom(xScale);
    // const yAxis = d3.axisLeft(yScale);
    // svg.append("g")
    //    .attr("transform", "translate(0," + (h - padding) + ")")
    //    .call(xAxis);

    // svg.append("g")
    //    .attr("transform", "translate(" + padding + ", 0)")
    //    .call(yAxis);
    container.innerHTML = "hi"
})();
const container = document.getElementById('chart');
const w = 500;
const h = 300;
const padding = 40;
var margin = {top: 30, right: 30, bottom: 70, left: 60};
container.innerHTML = "hi"
// console.log("hi");
const svg = d3.select("body")
    .append("svg")
        .attr("width", w)
        .attr("height", h)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
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
    dataset = dataset.data;
    console.log("h");

    // Create X and Y scale
    const x = d3.scaleTime()
        .domain([d3.min(dataset, (d) => new Date(d[0])), d3.max(dataset, (d) => new Date(d[0]))])
        .range([0, w])
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + h + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

    const y = d3.scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[1])])
        .range([h, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));
    
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
            .attr("x", d => xScale(new Date(d[0])))
            .attr("y", d => yScale(d[1]))
            .attr("width", x.bandwidth())
            .attr("height", d => h - d[1])
            .attr("fill", "navy");

    

    // Create and append X and Y axis
    // const xAxis = d3.axisBottom(xScale);
    // const yAxis = d3.axisLeft(yScale);
    // svg.append("g")
    //    .attr("transform", "translate(0," + (h - padding) + ")")
    //    .call(xAxis);

    // svg.append("g")
    //    .attr("transform", "translate(" + padding + ", 0)")
    //    .call(yAxis);
})();
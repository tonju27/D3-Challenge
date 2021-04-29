// @TODO: YOUR CODE HERE!
// Lesson 3 Activity 9
console.log("app.js loaded");
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv").then(function (census) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    census.forEach
        (function (data) {
            data.healthcare = +data.healthcare;
            data.poverty = +data.poverty;

            //   console.log(data);
            //   console.log(data.healthcare);
            //   console.log(data.poverty);

        });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
        .domain([20, d3.min(census, d => d.poverty)])
        .range([width, 0]);

    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(census, d => d.healthcare)])
        .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
        .data(census)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("opacity", ".75")

   
    // // Step 6: Add text to data points
    // // ==============================    

    chartGroup.append("g")
        .selectAll('text')
        .data(census)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .classed(".stateText", true)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "10px")
        .style("font-weight", "bold")
        .attr("alignment-baseline", "central");

    // Step 7: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.state}<br>Healthcare: ${d.healthcare}<br>Poverty: ${d.poverty}`);
        });

    // Step 8: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 9: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function (data) {
        toolTip.show(data, this);
    })
        // onmouseout event
        .on("mouseout", function (data, index) {
            toolTip.hide(data);
        });

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 3}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
}).catch(function (error) {
    console.log(error);
});







// // Step 5: Generate scatter
// // ==============================

// chartGroup.selectAll("circle")
//     .data(census)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d.povery))
//     .attr("cy", d => yLinearScale(d.healthcare))
//     .attr("r", "10")
//     .attr("stroke-width", "1")
//     .classed("stateCircle", true)
//     .attr("opacity", 0.75);

// // Step 6: Add text to data points
// // ==============================

// chartGroup.append("g")
//     .selectAll('text')
//     .data(census)
//     .enter()
//     .append("text")
//     .text(d => d.abbr)
//     .attr("x", d => xLinearScale(d.poverty))
//     .attr("y", d => yLinearScale(d.healthcare))
//     .classed(".stateText", true)
//     .attr("font-family", "sans-serif")
//     .attr("text-anchor", "middle")
//     .attr("fill", "white")
//     .attr("font-size", "10px")
//     .style("font-weight", "bold")
//     .attr("alignment-baseline", "central");

// // Add axes tiles

// chartGroup.append("text")
//     .attr("transform", `translate(${width / 2}, ${height + margin.top + 13})`)
//     .attr("text-anchor", "middle")
//     .attr("font-size", "16px")
//     .attr("fill", "black")
//     .style("font-weight", "bold")
//     .text("In Poverty");

// chartGroup.append("text")
//     .attr("y", 0 - ((margin.left / 2) + 2))
//     .attr("x", 0 - (height / 2))
//     .attr("text-anchor", "middle")
//     .attr("font-size", "16px")
//     .attr("fill", "black")
//     .style("font-weight", "bold")
//     .attr("transform", "rotate(-90)")
//     .text("Lack Healthcare (%)");
// }).catch(function(error) {
//     console.log(error);
// });


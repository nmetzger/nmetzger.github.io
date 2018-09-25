var brainspaceChart = document.getElementById("BrainspaceChart").getContext('2d');
var myChart = new Chart(brainspaceChart, {
    type: 'bar',
    data: {
        labels: [["Want Creating","& Editing Tools"], ["Don't Want Social","Media Sharing"], ["Want Email"," Sharing"], ["Want Orgainizational","Tools"]],
        datasets: [{
            data: [79, 74, 79, 40],
            backgroundColor: [
                'rgba(198, 187, 196, 1)',
                'rgba(198, 187, 196, 1)',
                'rgba(198, 187, 196, 1)',
                'rgba(198, 187, 196, 1)'
            ],
            hoverBackgroundColor: [
                '#7CE9FF',
                '#FEC308',
                '#FF951C',
                '#FFA8BA'
            ],
            borderColor: [
                '#7CE9FF',
                '#FEC308',
                '#FF951C',
                '#FFA8BA'
            ],
            borderWidth: 4
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    display: false
                },
                gridLines: {
                    color: "rgba(56, 145, 166, 0)"
                }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    display: false,
                    fontColor: "#ffffff"
                },
                gridLines: {
                    color: "rgba(56, 145, 166, 0)"
                }
            }]
        },
        plugins: {
                    datalabels: {
                        color: 'white',
                        display: function(context) {
                            console.log("Algo: "+context);
                            return context.dataset.data[context.dataIndex] > 15;
                        },
                        font: function(context) {
                            var width = context.chart.width;
                              var size = Math.round(width / 16);
                                return {
                                  weight: 'bold',
                                  family: 'aileron',
                                  size: size,
                                  weight: 600
                                };
                        },
                        formatter: function(value, context) {
                        return Math.round(value) + '%';
                    }
                    }
                },
      
        tooltips: {
            callbacks: {
                label: function(tooltipItem) {
                    return "";
                }
            }
        },
        legend: {
            display: false
        }
    }
});

Chart.types.Bar.extend({
    name: "BarAlt",
    initialize: function (data) {
        Chart.types.Bar.prototype.initialize.apply(this, arguments);

        if (this.options.curvature !== undefined && this.options.curvature <= 1) {
            var rectangleDraw = this.datasets[0].bars[0].draw;
            var self = this;
            var radius = this.datasets[0].bars[0].width * this.options.curvature * 0.5;

            // override the rectangle draw with ours
            this.datasets.forEach(function (dataset) {
                dataset.bars.forEach(function (bar) {
                    bar.draw = function () {
                        // draw the original bar a little down (so that our curve brings it to its original position)
                        var y = bar.y;
                        // the min is required so animation does not start from below the axes
                        bar.y = Math.min(bar.y + radius, self.scale.endPoint - 1);
                        // adjust the bar radius depending on how much of a curve we can draw
                        var barRadius = (bar.y - y);
                        rectangleDraw.apply(bar, arguments);

                        // draw a rounded rectangle on top
                        Chart.helpers.drawRoundedRectangle(self.chart.ctx, bar.x - bar.width / 2, bar.y - barRadius + 1, bar.width, bar.height, barRadius);
                        ctx.fill();

                        // restore the y value
                        bar.y = y;
                    }
                })
            })
        }
    }
});


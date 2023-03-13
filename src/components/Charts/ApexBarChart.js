import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexBarChart extends React.Component {
    constructor(props) {
      super(props);

      const {
        totalTransactionSeries,
        suspectedTransactionSeries,
        transactionSeries
      } = props;

      this.state = {      
        series: [{
          name: 'Total Txn',
          data: totalTransactionSeries
        },
        {
          name: 'Suspected Txn',
          data: suspectedTransactionSeries
        }
      ],
        options: {
          chart: {
            height: 350,
            type: 'bar',
            stacked: true,
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              columnWidth: '50%'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: 2
          },
          colors: ["#4FD1C5", "#F56565"],
          grid: {
            row: {
              colors: ['#fff', '#f2f2f2']
            }
          },
          xaxis: {
            labels: {
              rotate: -45
            },
            categories: transactionSeries,
            tickPlacement: 'on'
          },
          yaxis: {
            title: {
              text: 'Transaction Count',
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              type: "horizontal",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 0.85,
              opacityTo: 0.85,
              stops: [50, 0, 100]
            },
          }
        },
        
      
      };
    }

  

    render() {
      return (
        <div id="chart">
            <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                height={350}
            />  
        </div>
        );
    }
}

export default ApexBarChart;
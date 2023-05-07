import React from "react";
import ReactApexChart from "react-apexcharts";
import Card from "components/Card/Card.js";
import {  Flex, Text } from "@chakra-ui/react";


class ApexBarChart extends React.Component {
    constructor(props) {
      super(props);

      const {
        totalTransactionSeries,
        transactionSeries, 
        ySeriesName
      } = props;

      this.state = {      
        series: [{
          name: 'Total Txn',
          data: totalTransactionSeries
        },
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
              text: ySeriesName,
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
      const { title, ...rest } = this.props;
      return (
        <Card p='20px' align='center' direction='column' w='100%' {...rest}>
        <Flex
          px={{ base: "0px", "2xl": "10px" }}
          justifyContent='space-between'
          alignItems='center'
          w='100%'
          mb='8px'>
          <Text fontSize='md' fontWeight='600' mt='4px'>
            { title || '' }
          </Text>
        </Flex>
        <div id="chart">
            <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                height={350}
            />  
        </div>
        </Card>
        );
    }
}

export default ApexBarChart;
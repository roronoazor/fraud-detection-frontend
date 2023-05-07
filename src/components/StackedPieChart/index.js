import React from "react";
import ReactApexChart from "react-apexcharts";
import Card from "components/Card/Card.js";
import { Flex, Text, } from "@chakra-ui/react";


class ApexPieChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [44, 55, 13, 43, 22],
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
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
              type="pie" width={380}
             />
        </div>
      </Card>
      );
    }
  }

export default ApexPieChart;
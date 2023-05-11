import React from "react";
import ReactApexChart from "react-apexcharts";
import Card from "components/Card/Card.js";
import { Flex, Text, } from "@chakra-ui/react";
import numbro from 'numbro';

const formatNumberWithCommas = (value) => {
  return numbro(value).format({ thousandSeparated: true });
};


class ApexPieChart extends React.Component {
    constructor(props) {
      super(props);
      const { series, labels } = props;

      this.state = {
      
        // series: [44, 55, 13, 43, 22],
        series: series,
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: labels,
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
          }],
          tooltip: {
            y: {
              formatter: formatNumberWithCommas,
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
              type="pie" width={800}
             />
        </div>
      </Card>
      );
    }
  }

export default ApexPieChart;
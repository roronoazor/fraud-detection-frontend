import React from "react";
import ReactApexChart from "react-apexcharts";
import Card from "components/Card/Card.js";
import { Flex, Text, } from "@chakra-ui/react";
import numbro from 'numbro';

const formatNumberWithCommas = (value) => {
  return numbro(value).format({ thousandSeparated: true });
};

class ApexLineChart extends React.Component {
    constructor(props) {
      super(props);
      const { ySeriesName='Txn', ySeries=[], xSeries=[] } = props;
      this.state = {
        series: ySeries,
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          legend: {
            tooltipHoverFormatter: function(val, opts) {
              return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
            }
          },
          markers: {
            size: 0,
            hover: {
              sizeOffset: 6
            }
          },
          xaxis: {
            categories: xSeries,
          },
          yaxis: {
            title: {
              text: ySeriesName,
            },
          },
          grid: {
            borderColor: '#f1f1f1',
          },
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
                type="line" 
                height={350}
            />
        </div>
        </Card>
        );
    }
}

export default ApexLineChart;
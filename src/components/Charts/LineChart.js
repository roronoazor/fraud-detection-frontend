import React from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartData, lineChartOptions } from "variables/charts";

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: this.props.chartData,
      chartOptions: {...lineChartOptions,  xaxis: {...lineChartOptions.xaxis, categories: this.props.chartOptions}},
      intervalId: 0
    };
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.setState({
        chartData: this.props.chartData,
        chartOptions: {...lineChartOptions,  xaxis: {...lineChartOptions.xaxis, categories: this.props.chartOptions}}},
      );
    }, 2000);

    this.setState(prevState => {
      return {
        ...prevState,
        intervalId
      }
    })
  }

  componentWillUnmount(){
    clearInterval(this.state.intervalId);
  }


  render() {
    
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="area"
        width="100%"
        height="100%"
      />
    );
  }
}

export default LineChart;

import React, { useEffect, useState } from "react";
import { Progress, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import { PreviewAltCard } from "../../preview/Preview";
import { investData, investDataSet2, investDataSet3, investDataSet4 } from "../invest/invest-plan/InvestData";
import Icon from "../../icon/Icon";
import { LineChartExample } from "../../charts/Chart";
import { solidLineChart } from "../../../pages/components/charts/ChartData";

const StackedLineTxnChart = ({ title = "" }) => {
  const [planSet, setPlanSet] = useState("30");
  const [data, setData] = useState(investData);

  useEffect(() => {
    let newData;
    if (planSet === "7") {
      newData = investDataSet2;
    } else if (planSet === "15") {
      newData = investDataSet3;
    } else {
      newData = investDataSet4;
    }
    setData(newData);
  }, [planSet]);

  return (
    <PreviewAltCard className="card-full card-bordered" bodyClass="d-flex flex-column h-100">
      <div className="card-title-group mb-3">
        <div className="card-title">
          <h6 className="title">{title}</h6>
          <p>In Last {planSet === "7" ? "7" : planSet === "15" ? "15" : "30"} days</p>
        </div>
        <div className="card-tools mt-n4 mr-n1">
          <UncontrolledDropdown>
            <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
              <Icon name="more-h"></Icon>
            </DropdownToggle>
            <DropdownMenu right>
              <ul className="link-list-opt no-bdr">
                <li className={planSet === "7" ? "active" : ""}>
                  <DropdownItem
                    tag="a"
                    href="#dropdownitem"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPlanSet("7");
                    }}
                  >
                    <span>7 Days</span>
                  </DropdownItem>
                </li>
                <li className={planSet === "15" ? "active" : ""}>
                  <DropdownItem
                    tag="a"
                    href="#dropdownitem"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPlanSet("15");
                    }}
                  >
                    <span>15 Days</span>
                  </DropdownItem>
                </li>
                <li className={planSet === "30" ? "active" : ""}>
                  <DropdownItem
                    tag="a"
                    href="#dropdownitem"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPlanSet("30");
                    }}
                  >
                    <span>30 Days</span>
                  </DropdownItem>
                </li>
              </ul>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
      <div className="analytic-data-group analytic-au-group g-4">
        <div className="analytic-data analytic-au-data">
          <div className="title">Total Transactiions</div>
          <div className="amount">92,000</div>
        </div>
        <div className="analytic-data analytic-au-data">
          <div className="title">Suspected Transactions</div>
          <div className="amount">12,000</div>
        </div>
        <div className="analytic-data analytic-au-data">
          <div className="title">Failed Transactions</div>
          <div className="amount">565</div>
        </div>
      </div>
      <div className="nk-ck">
        <LineChartExample legend={true} data={solidLineChart} />
      </div>
    </PreviewAltCard>
  );
};
export default StackedLineTxnChart;

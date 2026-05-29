import React from "react";
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import { PreviewAltCard } from "../../../../components/preview/Preview";
import Icon from "../../../../components/icon/Icon";
import { LineChartExample } from "../../../../components/charts/Chart";

const StackedLineChartUI = ({ title, planSet, chartData, changePlanSet, totalTxn, suspectedTxn, emptyMessage }) => {
  const hasChartData = chartData?.labels?.length > 0;

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
                      changePlanSet("7");
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
                      changePlanSet("15");
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
                      changePlanSet("30");
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
          <div className="amount">{totalTxn || 0}</div>
        </div>
        <div className="analytic-data analytic-au-data">
          <div className="title">Suspected Transactions</div>
          <div className="amount">{suspectedTxn || 0}</div>
        </div>
      </div>
      <div className="nk-ck">
        {hasChartData ? (
          <LineChartExample legend={true} data={chartData} />
        ) : (
          <div className="text-center text-muted py-5">{emptyMessage || "No transaction data"}</div>
        )}
      </div>
    </PreviewAltCard>
  );
};
export default StackedLineChartUI;

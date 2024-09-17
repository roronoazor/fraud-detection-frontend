import React from "react";
import { firstLetterUpper } from "../../modules/utilities";

const MonitoringComments = (props) => {
  const { title, transaction } = props;
  const comments = transaction?.monitoring_comments_detail || [];

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">{title}</h6>
      </div>
      <div className="card-body">
        {comments.length > 0 ? (
          <ul className="list-group list-group-flush">
            {comments.map((comment, index) => (
              <li key={index} className="list-group-item d-flex align-items-center">
                <i className="bi-exclamation-triangle-fill text-danger me-2"></i> {/* Replace with appropriate icon */}
                <span>{firstLetterUpper(comment)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center">
            <span>No Comments.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonitoringComments;

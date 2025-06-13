import React, { useEffect } from "react";
import "../styles/pages/_employlist.scss";
import FetchEmployeeListFunctions from "../functions/FetchEmployeeListFunctions";

const Employlist = () => {
  const {
    usersEmployee,
    loading,
    fetchEmployeeList
  } = FetchEmployeeListFunctions();

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const handleRowClick = (employ) => {
    console.log("Selected employee:", employ); // Fixed here
  };

  return (
    <section>
      <div className="employ-list-container">
        <h1>EMPLOYMENT LIST</h1>

        <div className="employ-table-container">
          <table className="employ-table">
            <thead>
              <tr className="employ-table-header">
                <th>ID</th>
                <th>Name</th>
                <th>Basic Salary</th>
                <th>TIN</th>
                <th>SSS</th>
              </tr>
            </thead>
            <tbody>
              {!loading && usersEmployee.length > 0 ? (
                usersEmployee.map((emp) => (
                  <tr
                    className="employ-table-row"
                    key={emp.id}
                    onClick={() => handleRowClick(emp)}
                  >
                    <td>{emp.id}</td>
                    <td>{emp.fullName}</td>
                    <td>{emp.salary}</td>
                    <td>{emp.tin}</td>
                    <td>{emp.sss}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Employlist;

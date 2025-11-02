import Header from "./Header";
import "../styles/HomePgBody.css";

import { TestTiming } from "./TestTiming";
import { useState } from "react";
import TableHeadings from "./TableHeadings";
import { UserAuth } from "../context/AuthContext";
import { MealType } from "./MealType";
import { useEffect } from "react";

import { MealTypeKeys } from "./MealType";

const HomePgBody = () => {
  const { saveBloodSugarReading, bloodSugarLog } = UserAuth();
  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const date = data.date;
    const mealTimeType = MealType[data.mealTimeType];
    const mealTimeValue = data.mealTimeValue;
    saveBloodSugarReading(date, mealTimeType, mealTimeValue);
  };

  return (
    <div className="homepgbody">
      <div className="form-section">
       <form onSubmit={handleSubmit}>
  <div className="inputForm">
    <div className="inputs-group">
      <div className="inputItem">
        <label htmlFor="date">Select Date :</label>
        <input type="date" name="date" />
      </div>
      <div className="inputItem">
        <label htmlFor="mealTimeType">Select Time :</label>
        <select name="mealTimeType">
          {TestTiming.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="inputItem">
        <label htmlFor="mealTimeValue">Sugar Level :</label>
        <input type="number" name="mealTimeValue" />
      </div>
    </div>

    <div className="form-buttons">
      <button type="reset" className="btn btn-secondary">Reset</button>
      <button type="submit" className="btn btn-primary">Save</button>
    </div>
  </div>
</form>

      </div>
      <div className="table-section">
        {/* <HomePageTable tableData={tableData} /> */}
        <table className="table text-center ">
          <thead>
            <tr>
              {TableHeadings.map((item, index) => (
                <th className="p-2 border" key={index} scope="col">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bloodSugarLog?.map((item, index) => (
              <tr key={index}>
                {MealTypeKeys?.map((item2, index2) => (
                  <td className="border" key={index2}>
                    {item[item2]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default HomePgBody;

// <div className="inputItem">
//               <div className="button-div">
//                 <button type="reset" className="btn btn-secondary">
//                   Reset
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   Save
//                 </button>
//               </div>

//             </div>

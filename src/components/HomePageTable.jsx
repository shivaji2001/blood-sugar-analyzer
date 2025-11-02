import { TestTiming } from "./TestTiming";
import TableHeadings from "./TableHeadings";
import { useEffect } from "react";

const HomePageTable = ({ tableData }) => {
  useEffect(()=>{
    console.log('In my table ',tableData);
  },[tableData])
  return (
    <table className="table">
      <thead>
        <tr>
          {TableHeadings.map((item, index) => (
            <th key={index} scope="col">
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(tableData).map(([key, value]) => (
           
          <tr key={key}>
            {
                TestTiming.map((item,index)=>{
                    
                     return  <td key={index}>{tableData[[key]][[item]]}</td>
                }
                   
                )
            }
          
          </tr>
        ))}
       
      </tbody>
    </table>
  );
};
export default HomePageTable;

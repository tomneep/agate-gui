import Table from "react-bootstrap/Table";
import {IngestionItem} from "./IngestionItem"

function status(s: string):string {
    switch (s) {
      case 'US': {
        return "Unstarted";
      }
      case 'MD': {
        return "Awaiting metadata checks";
      }
      case 'VD': {
        return "Awaiting validation Checks";
      }
      case 'FM': {
        return "Metadata checks failed";
      }
      case 'FV': {
        return "Validation checks fail";
      }
      case 'SU': {
        return "Success";
      }
      default: {
        return "Unknown";
      }
    }
  } 
  
  function bool_icon(b: boolean):string {
    if(b) {return '\u2713';}
    else {return '\u2717'};
  }
  
  
  export function ResultsTable({
    data
  }: {
    data: IngestionItem[];
  }) {
  
  
    return (
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th key={"project"} title={"project"}> Project</th>
            <th key={"platform"} title={"platform"}> Platform</th>
            <th key={"site"} title={"site"}>Site </th>
            <th key={"status"} title={"status"}>Status </th>
            <th key={"is_published"} title={"is_published"}>Published </th>
            <th key={"is_test_attempt"} title={"is_test_attempt"}>Test Attempt</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
                <td key={"project"}>{row.fields.project}</td>
                <td key={"platform"}>{row.fields.platform}</td>
                <td key={"site"}>{row.fields.site}</td>
                <td key={"status"}>{status(row.fields.status)}<div id="myProgress">
                  <div id="myBar" className={row.fields.status}></div>
                  </div></td>
                <td key={"is_published"}>{bool_icon(row.fields.is_published)}</td>
                <td key={"is_test_attempt"}>{bool_icon(row.fields.is_test_attempt)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
  
  
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
        return "Validation checks failed";
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
    httpPathHandler,
    data,
    handleRefreshClick
  }: {
    httpPathHandler: (path: string) => Promise<Response>;
    data: IngestionItem[];
    handleRefreshClick: ()=>void
  }) {
    
  function archive(uuid: string) {
    httpPathHandler(`archive/${uuid}`)
    .then(()=>handleRefreshClick())
  }
  
  
    return (
      <Table striped bordered hover responsive size="sm">
        <thead>
          <tr>
            <th key={"name"} title={"name"}>Name</th>
            <th key={"platform"} title={"platform"}>Platform</th>
            <th key={"status"} title={"status"}>Status </th>
            <th key={"is_published"} title={"is_published"}>Published </th>
            <th key={"is_test_attempt"} title={"is_test_attempt"}>Test Attempt</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
                <td key={"name"}>{row.name +'('+row.uuid.slice(-5)+')'}</td>
                <td key={"platform"}>{row.platform}</td>
                <td key={"status"}  title={row.error_message}>{status(row.status)}<div id="myProgress">
                  <div id="myBar" className={row.status}></div>
                  </div></td>
                <td key={"is_published"}>{bool_icon(row.is_published)}</td>
                <td key={"is_test_attempt"}>{bool_icon(row.is_test_attempt)}</td>
                <td><button value = "Archive" onClick={ () => archive(row.uuid) }>Archive</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
  
  
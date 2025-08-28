import React, { useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { themeQuartz } from 'ag-grid-community';

import { IngestionItem } from "./IngestionItem";

// Register all community features once in your app entry point
ModuleRegistry.registerModules([AllCommunityModule]);

function status(s: string): string {
  switch (s) {
    case "US":
      return "Unstarted";
    case "MD":
      return "Awaiting metadata checks";
    case "VD":
      return "Awaiting validation Checks";
    case "FM":
      return "Metadata checks failed";
    case "FV":
      return "Validation checks failed";
    case "SU":
      return "Success";
    default:
      return "Unknown";
  }
}

function bool_icon(b: boolean): string {
  return b ? "✓" : "✗";
}

export function ResultsTable({
    httpPathHandler,
    data,
    handleRefreshClick,
}: {
  httpPathHandler: (path: string) => Promise<Response>;
  data: IngestionItem[];
  handleRefreshClick: () => void;
}) {
  const archive = useCallback(
    (uuid: string) => {
      httpPathHandler(`archive/${uuid}`).then(() => handleRefreshClick());
    },
    [httpPathHandler, handleRefreshClick]
  );

  const delete_record = useCallback(
    (uuid: string) => {
      httpPathHandler(`delete/${uuid}`).then(() => handleRefreshClick());
    },
    [httpPathHandler, handleRefreshClick]
  );

  // Define AG Grid columns
  const columnDefs = useMemo(
    () => [
      {
        headerName: "Name",
        field: "name",
        flex: 1,
        cellRenderer: (params: any) =>
          `${params.data.name} (${params.data.uuid.slice(-5)})`,
      },
      { headerName: "Platform", field: "platform", flex: 1 },
      {
        headerName: "Status",
        field: "status",
        flex: 1.5,
        tooltipField: "error_message",
        cellRenderer: (params: any) => {
          return (
            <div>
              {status(params.value)}
              <div id="myProgress">
                <div id="myBar" className={params.value}></div>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "Published",
        field: "is_published",
        flex: 1,
        cellRenderer: (params: any) => bool_icon(params.value),
      },
      {
        headerName: "Test Attempt",
        field: "is_test_attempt",
        flex: 1,
        cellRenderer: (params: any) => bool_icon(params.value),
      },
      {
        headerName: "Actions",
        field: "uuid",
        flex: 1.5,
        cellRenderer: (params: any) => (
          <div>
		<button
	    className="agate-row-button"
	    onClick={() => archive(params.value)}>Archive
	    </button>
		<button
	    className="agate-row-button"
	    onClick={() => delete_record(params.value)}>Delete
	    </button>
          </div>
        ),
	  cellStyle: { display: "flex", justifyContent: "left", alignItems: "center"},
      },
    ],
    [archive, delete_record]
  );

  return (
    // TODO: Set the height to something determined by the parent
    <div style={{ height: "80vh", width: "100%" }}>
	  <AgGridReact rowData={data} columnDefs={columnDefs} pagination={true} theme={themeQuartz}/>
    </div>
  );
}

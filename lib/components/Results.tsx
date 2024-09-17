import { ResultsProps } from "./Properties";
import { ResultsTable } from "./ResultsTable";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import {useEffect} from "react";

export function Results(props: ResultsProps) {

    const handleRefreshClick = () => {
      props.handleSearch()
    };
  
    useEffect(() => {
          //Implementing the setInterval method
          const interval = setInterval(() => {
            props.handleSearch();
          }, 10000);
   
          //Clearing the interval
          return () => clearInterval(interval);
      });
  
    return (
      <Card>
        <Card.Header>
          <span>Ingestion</span>
          <Button
            className="float-end"
            size="sm"
            variant="success"
            onClick={handleRefreshClick}
          >
            Refresh
          </Button>
        </Card.Header>
        <Container fluid className="table-panel p-2">
          {props.resultError ? (
            <Alert variant="danger">Error: {props.resultError.message}</Alert>
          ) : (
            <ResultsTable
              data={props.resultData || []}
            />
          )}
        </Container>
        <Card.Footer>
        </Card.Footer>
      </Card>
    );
  }
  
import {DataProps} from "./Properties"
import {useQuery} from "@tanstack/react-query";
import { Results } from "./Results";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";


export function Data(props: DataProps) {
  
  
    // Fetch data, depending on project and search parameters
    const {
      error: resultError,
      data: resultData,
      refetch: refetchResults,
    } = useQuery({
      queryKey: ["results", props.project],
      queryFn: async () => {
        return props
          .httpPathHandler(`ingestion/${props.project}/`)
          .then((response) => response.json())
          .then((string) => JSON.parse(string));
      },
      enabled: !!props.project,
    });
  
    const handleSearch = () => {
      // If search parameters have not changed, a refetch can be triggered
      // But only if the previous fetch has completed
        if(props.project) refetchResults();
    };
  
    return (
      <Container fluid className="g-2">
        <Stack gap={2}>
          <Results
            {...props}
            handleSearch={handleSearch}
            resultError={resultError instanceof Error ? resultError : null}
            resultData={resultData}
          />
        </Stack>
      </Container>
    );
  }
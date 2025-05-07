import Loader2 from "@/components/globals/loader2";
import ErrorText from "@/components/typograhpy/error-text";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";

type Props = React.PropsWithChildren & {
  dataReq: UseQueryResult<any, Error>;
};

const DisplayTable = ({ dataReq, children }: Props) => {
  return (
    <React.Fragment>
      {dataReq.isLoading && !dataReq?.isPending && <Loader2 />}
      {!dataReq.isPending && dataReq.isError && (
        <ErrorText message="unable to load data" />
      )}
      {dataReq.data?.length &&
        (dataReq?.data?.length > 0 ? (
          <>{children}</>
        ) : (
          <div>NO Data to display</div>
        ))}
    </React.Fragment>
  );
};

export default DisplayTable;

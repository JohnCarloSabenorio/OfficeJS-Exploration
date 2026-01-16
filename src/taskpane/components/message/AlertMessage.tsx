import React from "react";
export default function AlertMessage({ anomaliesExist }: { anomaliesExist: boolean }) {
  return (
    <>
      {!anomaliesExist ? (
        <p className="text-green-500 font-bold text-center text-xl mt-5">No Anomalies Detected.</p>
      ) : (
        <p className="text-red-500 font-bold text-center text-xl mt-5">Anomalies Found.</p>
      )}
    </>
  );
}

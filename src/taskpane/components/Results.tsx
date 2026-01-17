import React from "react";
import AlertMessage from "./message/AlertMessage";
import Slide from "./Slide";
export default function Results({ presentationErrors }: { presentationErrors: any }) {
  console.log("presentation errors:", presentationErrors);
  return (
    <section className="h-full bg-gray-100 flex-1 mt-3 p-3">
      <h1 className="text-2xl">Vitals</h1>

      <AlertMessage anomaliesExist={Object.keys(presentationErrors).length != 0} />

      <div className="h-full w-full flex flex-col gap-3 py-3">
        {presentationErrors != null &&
          Object.keys(presentationErrors).map((slideNumber, idx) => {
            if (
              presentationErrors[slideNumber].textDensityErrors.length != 0 ||
              presentationErrors[slideNumber].textDensityWarnings.length != 0 ||
              presentationErrors[slideNumber].fontNameErrors.length != 0
            )
              return (
                <Slide
                  key={idx}
                  slideProblems={presentationErrors[slideNumber]}
                  slideNumber={parseInt(slideNumber)}
                />
              );

            return <></>;
          })}
      </div>
    </section>
  );
}

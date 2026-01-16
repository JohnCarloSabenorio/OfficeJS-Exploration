import * as React from "react";

import { useState } from "react";
import Header from "./Header";
import Results from "./Results";
import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
interface AppProps {
  title: string;
}

const App: React.FC<AppProps> = (props: AppProps) => {
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.

  const [presentationErrors, setPresentationErrors] = useState({});
  const [isScanning, setIsScanning] = useState(false);
  async function scanSlideVitals() {
    await PowerPoint.run(async (context) => {
      setIsScanning(true);
      const slideCount = context.presentation.slides.getCount();
      await context.sync();

      const slideErrors = {};
      // Check text shapes
      for (let i = 0; i < slideCount.value; i++) {
        const slide = context.presentation.slides.getItemAt(i);
        const shapes = slide.shapes;
        shapes.load("type");
        await context.sync();

        // load text frames
        shapes.load("items/textFrame/hasText");
        await context.sync();

        // filter text frames
        const textShapes = shapes.items.filter(
          (shape) => shape.textFrame && shape.textFrame.hasText
        );

        // load text ranges
        textShapes.forEach((textShape) => {
          textShape.textFrame.textRange.load("text");
        });

        await context.sync();
        let textCount = 0;
        // Get total text count
        textShapes.forEach((textShape) => {
          const text = textShape.textFrame.textRange.text;
          textCount += text.length;
        });

        let textDensityWarnings = [];
        let textDensityErrors = [];
        if (textCount > 400 && textCount <= 700) {
          textDensityWarnings.push(
            "Warning: Slide has too much text (400+ characters). Consider shortening or splitting the content."
          );
        } else if (textCount > 700) {
          textDensityErrors.push(
            "Error: Slide is overloaded with text (700+ characters). Break this into multiple slides or move details to speaker notes."
          );
        }

        if (textDensityWarnings.length > 0 || textDensityErrors.length > 0) {
          slideErrors[i + 1] = { ...slideErrors, textDensityErrors, textDensityWarnings };
        }
      }

      setPresentationErrors(slideErrors);
      setIsScanning(false);
    });
  }
  return (
    <div className="w-full h-[100vh] flex flex-col">
      <Header logo="assets/slidevitals-logo.png" title={props.title} />

      <button
        onClick={scanSlideVitals}
        className={`${isScanning ? "bg-gray-500" : "bg-orange-500 cursor-pointer"} text-white text-xl font-bold rounded-md px-5 py-3 mt-3`}
      >
        {isScanning ? "Scanning..." : "Scan Now"}
      </button>

      <Results presentationErrors={presentationErrors} />
    </div>
  );
};

export default App;

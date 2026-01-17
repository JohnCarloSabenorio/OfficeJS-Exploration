import * as React from "react";

import { useState } from "react";
import Header from "./Header";
import Results from "./Results";
import { makeStyles } from "@fluentui/react-components";
import {
  Ribbon24Regular,
  LockOpen24Regular,
  DesignIdeas24Regular,
  TextSortAscending16Filled,
} from "@fluentui/react-icons";
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
      const globalFontSizes = new Set();
      const globalFontNames = new Set();
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
          textShape.textFrame.textRange.load("font");
        });

        await context.sync();
        checkTexts(textShapes, i + 1);
      }

      // Check text Density

      setPresentationErrors(slideErrors);
      setIsScanning(false);

      function checkTexts(textShapes, slideNumber) {
        let charCount = 0;
        let usedFonts = [];
        let fontNameErrors = [];
        // let fontSizeWarnings = [];
        // let fontSizeErrors = [];
        // Get total text count

        textShapes.forEach((textShape) => {
          const text = textShape.textFrame.textRange.text;

          // Check font name consistency
          globalFontNames.add(textShape.textFrame.textRange.font.name);
          usedFonts.push(textShape.textFrame.textRange.font.name);
          // Check font size consistency
          globalFontSizes.add(textShape.textFrame.textRange.font.size);
          charCount += text.length;
        });

        if (globalFontNames.size > 2) {
          fontNameErrors.push(
            `Inconsistent font. Slide should only use two main fonts for consistency. Recorded fonts: ${Array.from(globalFontNames)} | Detected Font in slide: ${usedFonts}`
          );
        }

        let textDensityWarnings = [];
        let textDensityErrors = [];
        if (charCount > 400 && charCount <= 700) {
          textDensityWarnings.push(
            "Slide has too much text (400+ characters). Consider shortening or splitting the content."
          );
        } else if (charCount > 700) {
          textDensityErrors.push(
            "Slide is overloaded with text (700+ characters). Break this into multiple slides or move details to speaker notes."
          );
        }

        slideErrors[slideNumber] = {
          ...slideErrors[slideNumber],
          textDensityErrors,
          textDensityWarnings,
          fontNameErrors,
        };

        console.log("the slide errors:", slideErrors);
      }
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

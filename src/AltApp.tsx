/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useState, useEffect } from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./styles.css";
import { simpleInitialLayouts } from "./assets/utils";

interface Props {
  domElements: any[];
  className?: string;
  rowHeight?: number;
  onLayoutChange?: (layout: any, layouts: any) => void;
  cols?: any;
  breakpoints?: any;
  containerPadding: [number, number];
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const DropDrag: FunctionComponent<Props> = (props) => {
  const [layouts, setLayouts] = useState<{ [index: string]: any[] }>(simpleInitialLayouts);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");
  const [compactType, setCompactType] = useState<string | null>("vertical");
  const [mounted, setMounted] = useState(false);
  const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({
    lg: [],
  });


  useEffect(() => {
    setMounted(true);
  }, []);

  const onBreakpointChange = (breakpoint: any) => {
    setCurrentBreakpoint(breakpoint);
    setToolbox({
      ...toolbox,
      [breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || [],
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const onCompactTypeChange = () => {
  //   const newCompactType =
  //     compactType === "horizontal"
  //       ? "vertical"
  //       : compactType === "vertical"
  //       ? null
  //       : "horizontal";
  //   setCompactType(newCompactType);
  // };

  const onLayoutChange = (layout: any, layouts: any) => {
    setLayouts({ ...layouts });
  };

  const onDrop = (layout: any, layoutItem: any) => {
    alert(
      `Element parameters:\n${JSON.stringify(
        layoutItem,
        ["x", "y", "w", "h"],
        2
      )}`
    );
  };

  console.log(layouts);
  

  return (
    <div className="content">
      {/* <div
        className="droppable-element"
        draggable
        unselectable="on"
        onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
      >
        Droppable Element (Drag me!)
      </div> */}

      <div className="mb-4">
        <ResponsiveReactGridLayout
          {...props}
          style={{ background: "#f0f0f0" }}
          layouts={layouts}
          measureBeforeMount={false}
          useCSSTransforms={mounted}
          compactType={"vertical"}
          preventCollision={!compactType}
          onLayoutChange={onLayoutChange}
          onBreakpointChange={onBreakpointChange}
          onDrop={onDrop}
          isDroppable
          
        >
          {/* {generateDOM()} */}
          <div
          key={'sad'}
          style={{ background: "#ccc" }}
          // className={l.static ? "static" : ""}
        >
          {/* {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : ( */}
            <span className="text">{1}</span>
          {/* )} */}
        </div>
        </ResponsiveReactGridLayout>
      </div>
    </div>
  );
};

export default DropDrag;

DropDrag.defaultProps = {
  className: "layout",
  rowHeight: 30,
  onLayoutChange: (layout: any, layouts: any) => {},
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  containerPadding: [12, 12]
};

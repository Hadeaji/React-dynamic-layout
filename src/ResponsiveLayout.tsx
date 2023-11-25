/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useState, useEffect, ReactNode } from "react";
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
  children: ReactNode;
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function saveToLS(key: string, value: any) {
  if (localStorage) {
    localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}

function getFromLS(key: string) {
  let ls: { [key: string]: any } = {};

  if (localStorage) {
    try {
      const storedValue = localStorage.getItem("rgl-7");
      ls = storedValue ? JSON.parse(storedValue) : {};
    } catch (e) {
      console.log("using default layout");
    }
  }

  return ls[key];
}
const activeLayout = getFromLS("layout") || simpleInitialLayouts;

const sizes = ["xxs", "xs", "sm", "md", "lg"];

const ResponsiveLayout: FunctionComponent<Props> = (props) => {
  const [layouts, setLayouts] = useState<{ [index: string]: any[] }>(
    activeLayout
  );
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg');
  const [compactType, setCompactType] = useState<string | null>("vertical");
  const [mounted, setMounted] = useState(false);
  // const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({
  //   lg: [],
  // });
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onBreakpointChange = (breakpoint: any) => {
    console.log(breakpoint);

    setCurrentBreakpoint(breakpoint);
    // setToolbox({
    //   ...toolbox,
    //   [breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || [],
    // });
  };

  // const onWidthChange = (width: number) => {
  //   // console.log(width);

  //   if (width < 400) {
  //     setCurrentBreakpoint(sizes[0]); // "xxs" for width less than 400
  //   } else if (width < 600) {
  //     setCurrentBreakpoint(sizes[1]); // "xs" for width between 400 and 599
  //   } else if (width < 800) {
  //     setCurrentBreakpoint(sizes[2]); // "sm" for width between 600 and 799
  //   } else if (width < 1000) {
  //     setCurrentBreakpoint(sizes[3]); // "md" for width between 800 and 999
  //   } else {
  //     setCurrentBreakpoint(sizes[4]); // "lg" for width 1000 or greater
  //   }
  
  //   // setCurrentBreakpoint(breakpoint);
  //   // setToolbox({
  //   //   ...toolbox,
  //   //   [breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || [],
  //   // });
  // };

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
    saveToLS("layout", layouts);
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

  const handleToggle = () => {
    setEditMode(prevState => !prevState);
  };

  const setLayout = () => {
    onBreakpointChange('xs')
  };

  return (
    <>
      <button onClick={setLayout}>change layout</button>
      <button onClick={handleToggle}>
        {editMode ? 'in Edit Mode' : 'off'}
      </button>
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
        resizeHandles={[
          "s",
          "w",
          "e",
          "n"
      ]}
        // onWidthChange={onWidthChange}
        // breakpoint={currentBreakpoint}
      >
        {props.children}
      </ResponsiveReactGridLayout>
    </>
  );
};

export default ResponsiveLayout;

ResponsiveLayout.defaultProps = {
  className: "layout",
  rowHeight: 30,
  onLayoutChange: (layout: any, layouts: any) => {},
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  containerPadding: [12, 12],
};

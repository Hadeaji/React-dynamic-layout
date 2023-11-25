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
const measures = [ "480", "720", "920", "1120", "1280"];
type _string_ = string | undefined

const ResponsiveLayout: FunctionComponent<Props> = (props) => {
  const [layouts, setLayouts] = useState<{ [index: string]: any[] }>(
    activeLayout
  );
  const [currentBreakpoint, setCurrentBreakpoint] = useState<_string_>(undefined);
  const [minLayoutSize, setMinLayoutSize] = useState<_string_>(undefined);
  
  // const [compactType, setCompactType] = useState<"vertical" | "horizontal" | null | undefined>("vertical");
  const [mounted, setMounted] = useState(false);
  // const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({
  //   lg: [],
  // });
  const [editMode, setEditMode] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, [editMode]);

  // const onBreakpointChange = (breakpoint: any) => {
  //   console.log(breakpoint);

  //   setCurrentBreakpoint(breakpoint);
  //   // setToolbox({
  //   //   ...toolbox,
  //   //   [breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || [],
  //   // });
  // };

  // const onWidthChange = (width: number) => {
  //   console.log(width);
  // };

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

  // const onDrop = (layout: any, layoutItem: any) => {
  //   alert(
  //     `Element parameters:\n${JSON.stringify(
  //       layoutItem,
  //       ["x", "y", "w", "h"],
  //       2
  //     )}`
  //   );
  // };

  const handleToggle = () => {
    console.log(editMode);
    // setCompactType("horizontal")
    setEditMode((prevState) => !prevState);
  };

  // const setLayout = () => {
  //   onBreakpointChange('xs')
  // };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value == "Auto") {
      setMinLayoutSize('');
      setCurrentBreakpoint(undefined);
    } else {
      setMinLayoutSize(`${measures[Number(event.target.value)]}px`);
      setCurrentBreakpoint(sizes[Number(event.target.value)]);
    }
  };

  return (
    <>
      <button onClick={handleToggle}>
        {editMode ? "in Edit Mode" : "off"}
      </button>

      <select onChange={handleSizeChange}>
        <option value={"Auto"}>Auto</option>
        {sizes.map((size, index) => (
          <option key={index} value={index}>
            {size.toUpperCase()}
          </option>
        ))}
      </select>

      <div
        style={{
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flexDirection: "column",
        }}
      >
        <ResponsiveReactGridLayout
          {...props}
          style={{ border: "3px solid grey", borderRadius: "7px", width: minLayoutSize ? minLayoutSize : 'calc(100% - 6px)' }}
          layouts={layouts}
          measureBeforeMount={false}
          useCSSTransforms={mounted}
          compactType={"vertical"}
          preventCollision={true}
          onLayoutChange={onLayoutChange}
          // TO DO; the key is temp solution to refresh the layout children handels and drag effects,
          // check if that is rerendering the whole sub tree, if so research other solutions
          key={String(editMode)}
          isResizable={editMode}
          isDraggable={editMode}
          ////////////
          resizeHandles={["s", "w", "e", "n"]}
          // onWidthChange={onWidthChange}
          breakpoint={currentBreakpoint}
          // onBreakpointChange={onBreakpointChange}
          // onDrop={onDrop}
          // isDroppable
        >
          {props.children}
        </ResponsiveReactGridLayout>
      </div>
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

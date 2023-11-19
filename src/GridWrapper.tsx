import React, { ReactNode, useState } from "react";
import AreaBox from "./AreaBox";

interface GridWrapperProps {
  children: ReactNode;
}
const defaultGridTemplateAreas = [
  ["🅱️", "🅱️", "🅱️", "🅱️", "🅱️", "🅱️", "💵", "💵", "💵", "💵", "💵", "💵"],
  ["🅱️", "🅱️", "🅱️", "🅱️", "🅱️", "🅱️", "💵", "💵", "💵", "💵", "💵", "💵"],
  ["🅱️", "🅱️", "🅱️", "🅱️", "🅱️", "🅱️", "💸", "💸", "💸", "💸", "💸", "💸"],
  ["🅱️", "🅱️", "🅱️", "🅱️", "🅱️", "🅱️", "💸", "💸", "💸", "💸", "💸", "💸"],
];

const defaultAreas = ["🅱️", "💵", "💸"];

const GridWrapper: React.FC<GridWrapperProps> = ({ children }) => {
  const [view, setView] = useState<"areas" | "content">("content");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [gridTemplateAreas, setGridTemplateAreas] = useState<string[][]>(defaultGridTemplateAreas)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [areas, setAreas] = useState<string[]>(defaultAreas)
  

  const toggleView = () => {
    setView(prevView => (prevView === 'content' ? 'areas' : 'content'));
  };

  const addRow = () => {
    const rowNum = gridTemplateAreas.length;
    const newRow: string[] = [];
    for (let i = 0; i < 12; i++) {
      const name = `N-${(12*rowNum)+(i+1)}`;
      newRow.push(name)
    }
    setGridTemplateAreas(prevGrid => [...prevGrid, newRow]);
    setAreas(prevAreas => [...prevAreas, ...newRow]);
  };

  return (
    <>
      <button onClick={toggleView} style={{marginBottom: '20px'}}>toggle area view</button>
      <div
        className="grid-wrapper"
        style={{
          gridTemplateAreas: `"${gridTemplateAreas
            .map((row) => row.join(" "))
            .join('" "')}"`,
        }}
      >
        {view == "content" ? (
          <>
            {React.Children.toArray(children).map((child, index) => (
              <div
                className={`card grid-item ${areas.flat()[index]}`}
                // style={{ gridArea: `${areas.flat()[index]}` }}
              >
                {child}
              </div>
            ))}
          </>
        ) : (
          <>
            {areas.map((name, index) => {
              console.log(index);

              return <AreaBox key={name} text={name} />;
            })}
          </>
        )}
      </div>
      <button onClick={addRow}>add a row</button>
    </>
  );
};

export default GridWrapper;

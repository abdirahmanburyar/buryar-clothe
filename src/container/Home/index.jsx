import React from "react";
import CheckboxTree from "react-checkbox-tree";
import { IoIosArrowForward, IoIosArrowDown, IoIosCheckboxOutline, IoIosCheckbox } from 'react-icons/io'
import "react-checkbox-tree/lib/react-checkbox-tree.css";

export default function Home() {
  const [expanded, setExpanded] = React.useState([]);
  const [checked, setChecked] = React.useState([]);

  const nodes = [
    {
      value: "mars",
      label: "Mars",
      children: [
        { value: "phobos", label: "Phobos" },
        { value: "deimos", label: "Deimos" },
      ],
    },
  ];
  return (
    <CheckboxTree
      nodes={nodes}
      checked={checked}
      expanded={expanded}
      icons={{
        check: <IoIosCheckbox />,
        uncheck: <IoIosCheckboxOutline />,
        expandClose: <IoIosArrowForward />,
        expandOpen: <IoIosArrowDown />
      }}
      onCheck={(checked) => setChecked(checked)}
      onExpand={(expanded) => setExpanded(expanded)}
    />
  );
}

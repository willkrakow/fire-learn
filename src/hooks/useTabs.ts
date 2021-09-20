import React from "react";
import { a11yProps } from "src/utils";

interface IA11yProps {
  id: string;
  "aria-controls": string;
}

const useTabs = (totalTabs: number) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const tabArray = Array.from(Array(totalTabs).keys());
  const ariaProps: IA11yProps[] = tabArray.map((item, index) =>
    a11yProps(index)
  );

  return { tabValue, handleTabChange, ariaProps };
};

export default useTabs
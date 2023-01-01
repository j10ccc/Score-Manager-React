import { useModel } from "@umijs/max";
import { Select } from "antd";
import { ReactNode, useRef } from "react";

const TermSelectors = (): ReactNode[] => {
  const yearOptions: Array<{ value: number; label: string }> = [];
  const termOptions: Array<{ value: number; label: string }> = [
    { value: 0, label: "上学期" },
    { value: 1, label: "下学期" },
  ];

  const { selectTermInfo, setSelectTermInfo } = useModel("student");
  const termInfo = useRef(selectTermInfo);
  const { year, term } = termInfo.current;

  for (let i = 0; i < 4; i++) {
    yearOptions.push({ value: year - i, label: (year - i).toString() });
  }
  const onYearChange = (value: number) => {
    setSelectTermInfo(value, selectTermInfo.term);
  };
  const onTermChange = (value: number) => {
    setSelectTermInfo(selectTermInfo.year, value);
  };

  return [
    <Select
      placeholder="年份"
      key="yearSelector"
      options={yearOptions}
      defaultValue={year}
      onChange={onYearChange}
    />,
    <Select
      placeholder="学期"
      key="termSelector"
      options={termOptions}
      defaultValue={term}
      onChange={onTermChange}
    />,
  ];
};

export default TermSelectors;

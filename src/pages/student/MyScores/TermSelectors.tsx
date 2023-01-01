import { Select } from "antd";
import { MutableRefObject, ReactNode } from "react";

const TermSelectors = (
  props: MutableRefObject<{ year: number; term: string }>,
  setTermInfo: (year: number, term: string) => void
): ReactNode[] => {
  const yearOptions: Array<{ value: number; label: string }> = [];
  const termOptions: Array<{ value: string; label: string }> = [
    { value: "0", label: "上学期" },
    { value: "1", label: "下学期" },
  ];
  const { year, term } = props.current;
  for (let i = 0; i < 4; i++) {
    yearOptions.push({ value: year - i, label: (year - i).toString() });
  }
  const onYearChange = (value: number) => {
    setTermInfo(value, props.current.term);
  };
  const onTermChange = (value: string) => {
    setTermInfo(props.current.year, value);
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

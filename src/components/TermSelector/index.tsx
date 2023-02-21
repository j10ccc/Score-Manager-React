import { Select } from "antd";
import { memo, ReactElement, useState } from "react";

type PropsType = {
  defaultValue: { year: number; term: number };
  onChange: (event: { year: number; term: number }) => void;
};

const TermSelectors = (props: PropsType): ReactElement => {
  const {
    defaultValue: { year, term },
    onChange,
  } = props;
  const [termInfo, setTermInfo] = useState({
    ...props.defaultValue,
  });

  const yearOptions: Array<{ value: number; label: string }> = [];
  const termOptions: Array<{ value: number; label: string }> = [
    { value: 0, label: "上学期" },
    { value: 1, label: "下学期" },
  ];

  for (let i = 0; i < 4; i++) {
    yearOptions.push({ value: year - i, label: (year - i).toString() });
  }

  const onYearChange = (value: number) => {
    setTermInfo({ ...termInfo, year: value });
    onChange({ year: value, term: termInfo.term });
  };
  const onTermChange = (value: number) => {
    setTermInfo({ ...termInfo, term: value });
    onChange({ year: termInfo.year, term: value });
  };

  return (
    <>
      <Select
        placeholder="年份"
        key="yearSelector"
        options={yearOptions}
        defaultValue={year}
        onChange={onYearChange}
      />
      <Select
        placeholder="学期"
        key="termSelector"
        options={termOptions}
        defaultValue={term}
        onChange={onTermChange}
      />
    </>
  );
};

export default memo(TermSelectors);

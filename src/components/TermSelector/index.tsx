import { Select } from "antd";
import { memo, ReactElement, useState } from "react";

type PropsType = {
  defaultValue: { year: number };
  onChange: (event: { year: number }) => void;
};

const TermSelectors = (props: PropsType): ReactElement => {
  const {
    defaultValue: { year },
    onChange,
  } = props;
  const [termInfo, setTermInfo] = useState({
    ...props.defaultValue,
  });

  const yearOptions: Array<{ value: number; label: string }> = [];

  for (let i = 0; i < 4; i++) {
    yearOptions.push({ value: year - i, label: (year - i).toString() });
  }

  const onYearChange = (value: number) => {
    setTermInfo({ ...termInfo, year: value });
    onChange({ year: value });
  };

  return (
    <Select
      placeholder="年份"
      key="yearSelector"
      options={yearOptions}
      defaultValue={year}
      onChange={onYearChange}
    />
  );
};

export default memo(TermSelectors);

import { useState } from "react";

export interface Application {
  guid: string; // local
  term: number;
  year: number;
  label: string; // 中文名
  index: string; // 定位
  top: number;
  value?: number;
  content?: string;
  target?: string; // 辅导员工号
  // TODO: files
}

interface StudentStore {
  applications: Application[];
  termInfo: { year: number; term: number };
}

const useStudent = () => {
  const [myApplyTemp, setMyApplyTempInner] = useState<Application>();
  const [myApplyDrafts, setMyApplyDraftsInner] = useState<
    StudentStore["applications"]
  >([]);
  const [myApplyRecords, setMyApplyRecordsInner] = useState<
    StudentStore["applications"]
  >([]);
  const [selectTermInfo, setSelectTermInfoInner] = useState<
    StudentStore["termInfo"]
  >({ year: new Date().getFullYear(), term: 0 });

  const setMyApplyTemp = (value: Application) => {
    setMyApplyTempInner(value);
  };

  const setMyApplyDrafts = (value: Application) => {
    // TODO: top 负数
    setMyApplyDraftsInner((origin) => {
      let findSame = false;
      let tmp = origin.map((item) => {
        if (item.guid === value.guid) {
          findSame = true;
          return value;
        } else return item;
      });
      if (!findSame) tmp.push(value);
      return tmp;
    });
  };

  const setMyApplyRecords = (value: Application) => {
    setMyApplyRecordsInner((origin) => [...origin, value]);
  };

  const setSelectTermInfo = (year: number, term: number) => {
    setSelectTermInfoInner({ year, term });
  };

  return {
    myApplyTemp,
    myApplyDrafts,
    myApplyRecords,
    selectTermInfo,
    setMyApplyTemp,
    setMyApplyDrafts,
    setMyApplyRecords,
    setSelectTermInfo,
  };
};

export default useStudent;

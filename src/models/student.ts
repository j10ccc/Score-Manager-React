import { useEffect, useState } from "react";

type Application = StudentAPI.Application;

type ApplicationDraft = Application & { guid: string };

interface StudentStore {
  applications: Application[];
}

const useStudent = () => {
  const [myApplyTemp, setMyApplyTempInner] = useState<Application>();
  const [myApplyDrafts, setMyApplyDraftsInner] = useState<ApplicationDraft[]>(
    []
  );
  const [myApplyRecords, setMyApplyRecordsInner] = useState<
    StudentStore["applications"]
  >([]);

  useEffect(() => {
    const localMyApplyDrafts = localStorage.getItem("my_apply_drafts");
    if (localMyApplyDrafts)
      setMyApplyDraftsInner(JSON.parse(localMyApplyDrafts));
  }, []);

  const setMyApplyTemp = (value: Application) => {
    setMyApplyTempInner(value);
  };

  const addMyApplyDraft = (value: ApplicationDraft) => {
    setMyApplyDraftsInner((origin) => {
      let findSame = false;
      let tmp = origin.map((item) => {
        if (item.guid === value.guid) {
          findSame = true;
          return value;
        } else return item;
      });
      if (!findSame) tmp.push(value);
      localStorage.setItem("my_apply_drafts", JSON.stringify(tmp));
      return tmp;
    });
  };

  const deleteMyApplyDraft = (guid: string) => {
    setMyApplyDraftsInner((origin) => {
      const tmp = origin.filter((item) => item.guid !== guid);
      localStorage.setItem("my_apply_drafts", JSON.stringify(tmp));
      return tmp;
    });
  };

  const setMyApplyRecords = (value: Application[]) => {
    setMyApplyRecordsInner(value);
  };

  return {
    myApplyTemp,
    myApplyDrafts,
    myApplyRecords,
    setMyApplyTemp,
    addMyApplyDraft,
    deleteMyApplyDraft,
    setMyApplyRecords,
  };
};

export default useStudent;

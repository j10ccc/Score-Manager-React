import { applyScoreAPI, getMyCoachesAPI } from "@/services/student";
import { createGuid } from "@/utils";
import {
  ProForm,
  ProFormDigit,
  ProFormGroup,
  ProFormInstance,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { history, useModel } from "@umijs/max";
import { Button, Descriptions, Popconfirm, message } from "antd";
import { useEffect, useRef, useState } from "react";

type PropsType = {
  initialData: StudentAPI.Application;
};

const ApplicationForm = (props: PropsType) => {
  const { initialData } = props;
  const [dataSource, setDataSource] = useState(initialData);

  useEffect(() => {
    setDataSource(initialData);
  }, [initialData]);

  const formRef = useRef<ProFormInstance>();
  const { addMyApplyDraft, deleteMyApplyDraft } = useModel("student");

  const onFinish = async (formData: any) => {
    try {
      const res = await applyScoreAPI({
        ...formData,
        name: initialData.index,
      });
      if (res.code === 200) message.success("申请成功");
      else throw new Error();
    } catch (error) {
      message.error("申请失败");
    }
  };

  const handleDraft = () => {
    console.log(formRef.current?.getFieldValue("contents"));
    formRef.current?.validateFieldsReturnFormatValue?.().then((values) => {
      addMyApplyDraft({
        guid: createGuid(),
        ...dataSource,
        content: values.contents.map((item: any) => item.content),
        value: values.value,
        target: values.target,
      });
      message.success("已保存到草稿箱");
      history.push("/student/application/drafts");
    });
  };

  const handleDelete = () => {
    deleteMyApplyDraft(initialData.guid!);
  };

  return (
    <div style={{ background: "white", padding: "24px" }}>
      <Descriptions title="基本信息" column={1}>
        <Descriptions.Item label="学年">{dataSource.year}</Descriptions.Item>
        <Descriptions.Item label="申请项目">
          {dataSource.index}
        </Descriptions.Item>
      </Descriptions>
      <ProForm
        initialValues={initialData}
        onFinish={onFinish}
        formRef={formRef}
        submitter={{
          resetButtonProps: {
            style: {
              display: "none",
            },
          },
          render: (_, doms) => [
            <Button key="draft" type="dashed" onClick={handleDraft}>
              存草稿
            </Button>,
            initialData.guid !== undefined && (
              <Popconfirm
                title="删除草稿"
                description={`是否确定删除草稿 - ${initialData.label}`}
                onConfirm={handleDelete}
                okText="确定"
                cancelText="取消"
                key="delete"
              >
                <Button danger>删除</Button>
              </Popconfirm>
            ),
            ...doms,
          ],
        }}
      >
        <ProFormGroup>
          <ProFormDigit
            label="申请分数"
            placeholder={
              dataSource.top !== -1
                ? `最高分数 ${dataSource.top} 分`
                : undefined
            }
            name="value"
            max={dataSource.top === -1 ? undefined : dataSource.top}
            min={-100}
            rules={[{ required: true, message: "请输入分数" }]}
          />
          <ProFormSelect
            name="target"
            label="辅导员"
            request={async () => {
              const res = await getMyCoachesAPI();
              return (
                res.data?.list.map((item) => ({
                  label: item.name,
                  value: item.id,
                })) || []
              );
            }}
            placeholder="选择辅导员"
            rules={[{ required: true, message: "选择一位辅导员" }]}
          />
        </ProFormGroup>
        <ProFormGroup>
          <ProFormList
            label="申请理由"
            name="contents"
            copyIconProps={false}
            creatorButtonProps={{ creatorButtonText: "添加一条理由" }}
            initialValue={[]}
          >
            <ProFormText
              name="content"
              width={"xl"}
              rules={[{ required: true, message: "请输入内容" }]}
            />
          </ProFormList>
        </ProFormGroup>
      </ProForm>
    </div>
  );
};

export default ApplicationForm;

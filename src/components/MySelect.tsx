import { Select } from "antd";
import { useEffect, useState } from "react";

const MySelect: React.FC<{
  state: {
    type: number;
  };
  /** Value 和 onChange 会被自动注入 */
  value?: string;
  onChange?: (value: string) => void;
}> = (props) => {
  const { state } = props;

  const [innerOptions, setOptions] = useState<
    {
      label: React.ReactNode;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    const { type } = state || {};
    if (type === 2) {
      setOptions([
        {
          label: '星期一',
          value: 1,
        },
        {
          label: '星期二',
          value: 2,
        },
      ]);
    } else {
      setOptions([
        {
          label: '一月',
          value: 1,
        },
        {
          label: '二月',
          value: 2,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(state)]);

  return (
    <Select
      options={innerOptions}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default MySelect;
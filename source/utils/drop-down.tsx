import React, {useState} from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
interface IDropDown {
  data: {label: string; value: string}[];
  onValueChange: (value: string) => void;
}

const AADropDown = ({data, onValueChange}: IDropDown) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(data[0]?.value || null);

  return (
    <View>
      <DropDownPicker
        open={open}
        value={value}
        items={data}
        setOpen={setOpen}
        style={{width: 150}}
        setValue={setValue}
        onChangeValue={val => {
          setValue(val);
          onValueChange(val ?? '');
        }}
      />
    </View>
  );
};

export default AADropDown;

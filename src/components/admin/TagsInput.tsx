import React from 'react'
import { Autocomplete } from '@material-ui/lab'; 
import { TextField } from '@material-ui/core';

interface TagsInputProps {
    currentValues?: string[];
    onChange: (e: React.ChangeEvent<{}>, value: string[]) => void;
    label: string;
    placeholder?: string;
    options: string[];
}

const TagsInput = ({ currentValues, onChange, label, placeholder="Choose...", options }: TagsInputProps) => {
    const [ , setTags] = React.useState<string[]>(currentValues || []);
    const handleChange = (event: React.ChangeEvent<{}>, value: string[]) => {
      setTags(value)
      onChange(event, value);
    }


    return (
      <>
        <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option: string) => option}
        onChange={handleChange}
        defaultValue={currentValues || []}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            label={label}
            placeholder={placeholder}
          />
        )}
      />
      </>
    );
    }

export default TagsInput
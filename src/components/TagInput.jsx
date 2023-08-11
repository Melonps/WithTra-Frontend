import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const TagInput = ({ onTagsChange, options = [] }) => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
    };

    const handleAddTag = (tag) => {
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag]);
            setInputValue("");
            onTagsChange([...tags, tag]); // タグが変更されたときに上位コンポーネントに通知
        }
    };

    const handleDeleteTag = (tag) => {
        setTags(tags.filter((t) => t !== tag));
    };

    return (
        <div>
            <Autocomplete
                value={inputValue}
                onChange={(event, newValue) => handleAddTag(newValue)}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                options={options}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label="タグ" variant="outlined" />
                )}
            />
            <Stack direction="row" spacing={1} marginTop={2}>
                {tags.map((tag, index) => (
                    <Chip
                        key={index}
                        label={tag}
                        onDelete={() => handleDeleteTag(tag)}
                    />
                ))}
            </Stack>
        </div>
    );
};

export default TagInput;

import { TextField } from '@mui/material';

interface Props {
    id: string;
    name: string;
    label: string;
    type?: string;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthTextField({ id, name, label, type = 'text', value, error, onChange }: Props) {
    return (
        <TextField
            id={id}
            name={name}
            label={label}
            type={type}
            variant="outlined"
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error}
            sx={{
                marginTop: 2,
                width: '100%',
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'red',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: 'red',
                },
                '& .MuiInputLabel-root': {
                    fontSize: '14px'
                }
            }}
        />
    );
}

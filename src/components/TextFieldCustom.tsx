import { TextField, Typography } from '@mui/material';

interface Props {
    id: string;
    name: string;
    label: string;
    type?: string;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextFieldCustom({
    id,
    name,
    label,
    type = 'text',
    value,
    error,
    onChange,
}: Props) {
    const labelText = label.replace('*', '').trim();

    return (
        <TextField
            id={id}
            name={name}
            type={type}
            variant="outlined"
            value={value}
            onChange={onChange}
            error={Boolean(error)}
            helperText={error}
            fullWidth
            label={
                <Typography component="span" fontSize="14px">
                    {labelText}{' '}
                    <Typography component="span" color="red">
                        *
                    </Typography>
                </Typography>
            }
            sx={{
                mt: 2,
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'red',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: 'red',
                },
            }}
        />
    );
}

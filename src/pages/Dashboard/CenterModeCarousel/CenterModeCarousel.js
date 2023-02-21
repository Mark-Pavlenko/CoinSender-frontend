import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const EmployeeAutocomplete = ({ options, setCurrentUser }) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      getOptionLabel={(value) =>
        `${value?.employee?.second_name || 'No data'} ${value?.employee?.name || ''}` || ''
      }
      onChange={(e, value) => setCurrentUser(value)}
      renderInput={(params) => <TextField {...params} fullWidth label="Employee" />}
    />
  );
};

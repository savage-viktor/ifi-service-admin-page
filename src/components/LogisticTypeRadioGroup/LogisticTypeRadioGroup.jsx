import styles from "./LogisticTypeRadioGroup.module.css";

import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

const LogisticTypeRadioGroup = ({ initValue, onChange }) => {
  return (
    <RadioGroup row value={initValue} onChange={onChange}>
      <FormControlLabel
        value="post"
        control={<Radio size="small" />}
        label={
          <Typography className={styles.formControlLabel}>Пошта</Typography>
        }
      />
      <FormControlLabel
        value="remote"
        control={<Radio size="small" />}
        label={
          <Typography className={styles.formControlLabel}>Віддалено</Typography>
        }
      />
      <FormControlLabel
        value="meet"
        control={<Radio size="small" />}
        label={
          <Typography className={styles.formControlLabel}>Зустріч</Typography>
        }
      />
    </RadioGroup>
  );
};

export default LogisticTypeRadioGroup;

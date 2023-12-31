import { TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { Check } from '@mui/icons-material';
import useLocalToken from '@/hooks/useLocalToken';

type TokenProps = {
  setToken: (token: string) => void;
  token: string | null | undefined;
  setHasToken: (hasToken: boolean) => void;
  hasToken: boolean;
  systemHasToken: boolean;
};

const Token = (props: TokenProps) => {
  const { token: localToken, setLocalToken } = useLocalToken();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setToken(e.target.value);
  };

  useEffect(() => {
    if (localToken) {
      props.setToken(localToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localToken]);

  if (props.hasToken) {
    return (
      <div className={styles.hasTokenTrue}>
        <Typography variant="h6" className={styles.hasCheck}>
          <Check className={styles.check} />
          OpenAI API Token
        </Typography>
        <Typography variant="body2">
          This system already has a token set. Would you like to override it?{' '}
          <Link onClick={() => props.setHasToken(false)} href="">
            <strong>Yes</strong>
          </Link>
        </Typography>
      </div>
    );
  }

  return (
    <div className={styles.token}>
      <Typography variant="h6">OpenAI API Token</Typography>
      <Typography variant="body2">
        You need an OpenAI API token to use this app. You can get one <a href="https://beta.openai.com/">here</a>.
      </Typography>

      <div className={styles.TokenContainer}>
        <TextField
          type="password"
          fullWidth
          value={props.token ?? ''}
          onChange={handleChange}
          label="OpenAI API Token"
        />
      </div>
      <Typography variant="caption" sx={{ color: 'gray' }}>
        You can set a system open AI token by setting the environment variable <strong>OPEN_AI_API_TOKEN</strong>.
      </Typography>
      {props.systemHasToken && (
        <Typography variant="body2">
          <Link href="" onClick={() => props.setHasToken(true)}>
            Use Default Token
          </Link>
        </Typography>
      )}
    </div>
  );
};

export default Token;

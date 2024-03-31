import { useState, useEffect } from 'react';

export const usePasswordValidation = (password) => {
  const [passwordGuidelines, setPasswordGuidelines] = useState({
    minimum_length_of_8: false,
    upper_and_lowercase: false,
    number: false,
    symbol: false,
  });

  useEffect(() => {
    const updatePasswordGuidelines = (password) => {
      const guidelines = {
        minimum_length_of_8: password.length >= 8,
        upper_and_lowercase: /[A-Z]/.test(password) && /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[^A-Za-z0-9]/.test(password),
      };
      setPasswordGuidelines(guidelines);
    };

    updatePasswordGuidelines(password);
  }, [password]);

  return passwordGuidelines;
};



import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import RuIcon from '../../icons/Sidebar/russia.svg';
import WalletConnect from './WalletConnect';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/static/icons/ic_flag_en.svg'
  },
  {
    value: 'ru',
    label: 'Russian',
    icon: RuIcon
  }
];

const currentLocale = localStorage.getItem('i18nextLng') || 'ru';

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState(currentLocale);

  const { i18n } = useTranslation('common');

  useEffect(() => {
    i18n.changeLanguage(currentLocale);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeLanguage = ({ currentTarget: { id } }) => {
    setLanguage(id);
    i18n.changeLanguage(id);
    handleClose();
  };

  const selectLanguage = (languages) => languages.filter(({ value }) => value === language)[0];

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <img
          width={22}
          height={22}
          src={selectLanguage(LANGS).icon}
          alt={selectLanguage(LANGS).label}
        />
      </IconButton>
      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === language}
              id={option.value}
              onClick={handleChangeLanguage}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <img width={22} height={22} src={option.icon} alt=""/>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}

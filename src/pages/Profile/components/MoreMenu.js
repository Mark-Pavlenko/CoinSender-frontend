import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import { useDispatch } from 'react-redux';
import EditWallets from './EditWallets';

// ----------------------------------------------------------------------

export default function MoreMenu({ wallet }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const dispatch = useDispatch();

  const openModal = (value) => {
    setIsModalOpen(value);
  };

  const closeModal = (value) => {
    setIsModalOpen(value);
  };
  return (
    <>
      <EditWallets
        closeMenu={() => setIsOpen(false)}
        open={modalIsOpen}
        wallet={wallet}
        handleClose={closeModal}
      />
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() =>
            dispatch({
              type: 'DELETE_GENERAL_WALLET',
              payload: { id: wallet.id },
              org_id: user.organization_id,
            })
          }
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={() => openModal(true)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

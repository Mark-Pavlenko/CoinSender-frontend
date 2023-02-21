import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';
import WarningIcon from '../assets/icons/warning.svg';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px'
};

export default function ConfirmDeleteModal({ open, close, id, type }) {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const authData = localStorage.getItem('authorization_login');
  const authObj = JSON.parse(authData);

  const deleteEmployee = () => {
    switch (type) {
      case 'employee':
        dispatch({
          type: 'DELETE_EMPLOYEE_SAGA',
          payload: { employeeId: id, currentUser: authObj.user.id, translate: t }
        });
        break;
      case 'candidate':
        dispatch({ type: 'DELETE_CANDIDATE', candidateId: id, translate: t });
        break;
    }
    close();
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={close}
      >
        <>
          <Box sx={style}>
            <Stack mb={2} direction="column" alignItems="center" justifyContent="center" gap="20px">
              <Box>
                <img src={WarningIcon} alt="" />
              </Box>
              <Box>{t('are.you.sure.remove')}</Box>
              <Stack direction="row" gap="15px">
                <Button onClick={deleteEmployee} variant="contained">
                  {t('yes')}
                </Button>
                <Button onClick={close} variant="contained">
                  {t('no')}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </>
      </Modal>
    </div>
  );
}

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Accordion from '@mui/material/Accordion';
import TextField from '@mui/material/TextField';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import ProfileLeftSide from './ProfileLeftSide';

export default function PersonalInfo() {
  const { t } = useTranslation('common');

  return (
    <Stack direction="row" justifyContent="space-between">
      <Grid container spacing={2}>
        <ProfileLeftSide />
        <Grid item xs={12} md={6} lg={8}>
          <Accordion
            sx={{
              boxShadow:
                'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {t('education')} {t('and')} {t('languages')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                <Stack direction="row" alignItems="center" gap="20px">
                  <Box sx={{ width: '150px' }}>{t('education')}</Box>
                  <Box>16 декабря 1986 (32 года)</Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap="20px">
                  <Box sx={{ width: '150px' }}>{t('languages')}</Box>
                  <Box>Мужской</Box>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              boxShadow:
                'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                {t('experience')} {t('and')} {t('place.work')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                <Stack direction="row" alignItems="center" gap="20px">
                  <Box sx={{ width: '150px' }}>{t('experience')}</Box>
                  <Box>16 декабря 1986 (32 года)</Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap="20px">
                  <Box sx={{ width: '150px' }}>{t('place.work')}</Box>
                  <Box>Мужской</Box>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              boxShadow:
                'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography> {t('additional.information')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                <Stack direction="row" alignItems="center" gap="20px">
                  <Box sx={{ width: '150px' }}>{t('marital.status')}</Box>
                  <Box>16 декабря 1986 (32 года)</Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap="20px">
                  <Box sx={{ width: '150px' }}>{t('address')}</Box>
                  <Box>Мужской</Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap="20px">
                  <Box sx={{ width: '150px' }}>{t('children')}</Box>
                  <Box>Мужской</Box>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              boxShadow:
                'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{t('comments')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <TextField fullWidth multiline maxRows={5} sx={{ mb: 5 }} defaultValue="abs" />
              </div>
              <Stack direction="row" alignItems="center" gap="20px">
                <Button sx={{ width: 'fit-content' }} variant="contained">
                  {t('save')}
                </Button>
                <Button sx={{ width: 'fit-content' }} variant="contained">
                  {t('cancel')}
                </Button>
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              boxShadow:
                'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px'
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{t('technics')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                <Stack direction="row" alignItems="center" gap="20px">
                  <Box sx={{ width: '150px' }}>{t('inventory.number')}</Box>
                  <Box>16 декабря 1986 (32 года)</Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap="20px">
                  <Box sx={{ width: '150px' }}>{t('name.equipment')}</Box>
                  <Box>Мужской</Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap="20px">
                  <Box sx={{ width: '150px' }}>{t('model')}</Box>
                  <Box>Мужской</Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap="20px">
                  <Box sx={{ width: '150px' }}>{t('condition')}</Box>
                  <Box>Мужской</Box>
                </Stack>
                <Stack direction="row" alignItems="center" gap="20px">
                  <Box sx={{ width: '150px' }}>{t('date.issue')}</Box>
                  <Box>Мужской</Box>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Stack>
  );
}

import { filter } from 'lodash';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------
const TabsWrapper = styled('div')(() => ({
  marginBottom: '10px'
}));
// ----------------------------------------------------------------------

export const TabsComponent = ({ value, setValue, tabs }) => {
  return (
    <TabsWrapper>
      <Tabs value={value} onChange={setValue} aria-label="icon label tabs example">
        {tabs.map((el, index) => {
          return <Tab key={index} icon={el.icon} label={el.label} />;
        })}
      </Tabs>
    </TabsWrapper>
  );
};

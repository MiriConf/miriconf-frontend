import * as React from 'react';
import Link from 'next/link'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LaptopIcon from '@mui/icons-material/Laptop';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Groups';

export const mainListItems = (
  <React.Fragment>
    <Link href="/"><ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton></Link>

    <Link href="/teams"><ListItemButton>
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Teams" />
    </ListItemButton></Link>

    <Link href="/systems"><ListItemButton>
      <ListItemIcon>
        <LaptopIcon />
      </ListItemIcon>
      <ListItemText primary="Systems" />
    </ListItemButton></Link>

    <Link href="/users"><ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton></Link>

  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <Link href="/profile"><ListItemButton>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton></Link>
  </React.Fragment>
);

'use client'
import Dash from './dashboard'
import Teachers from './teachers'
import Students from './students'
import * as React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import GridViewIcon from '@mui/icons-material/GridView';
import SchoolIcon from '@mui/icons-material/School';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';


const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
      
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Content() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null); 
  const [viewProjects, setviewprojects] = React.useState(true)
  const[addProject,setaddproject] = React.useState(false)
  const[viewClassroom, setviewclassroom] = React.useState(false)
  const handleListItemClick = (index) => { 
    setSelectedIndex(index);
    console.log("clicked",index)
    if (index === 0){
      setaddproject(true)
      setviewprojects(false)
      setviewclassroom(false)
    }
    else if(index === 1){
      setviewprojects(true)
      setaddproject(false)
      setviewclassroom(false)
    }
    else{
      setviewclassroom(true)
      setaddproject(false)
      setviewprojects(false)
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

return (
  <Box sx={{ display: 'flex' }}>
  <CssBaseline />
  <AppBar position="fixed" open={open} >
    <Toolbar >

      <Typography variant="h6" noWrap component="div">
        UniChat
      </Typography>
    </Toolbar>
  </AppBar>
  <Drawer variant="permanent" open={open} onMouseEnter={handleDrawerOpen} onMouseLeave={handleDrawerClose}>
    <DrawerHeader>
      <IconButton >
        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </DrawerHeader>
    <Divider />
    <List>
      {['New Project', 'All Projects', 'Classroom'].map((text, index) => (
        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            selected={selectedIndex === index} 
            onClick={() => handleListItemClick(index)} 
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}

            >
              {index === 0 ? <AddBoxIcon />: ''}
              {index === 1 ? <GridViewIcon/>:''}
              {index === 2 ? <SchoolIcon/>:''}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider /> 
  </Drawer>
  <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <DrawerHeader />
   {viewProjects && <Dash/>}
   {addProject && <Teachers/>}
   {viewClassroom && <Students/>}
  </Box>
</Box>
)
}
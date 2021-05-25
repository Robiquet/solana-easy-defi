import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { useState, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const links = [
  {
    to: "/",
    text: "Home",
  },
  {
    to: "/onboarding",
    text: "Onboarding",
  },
  {
    to: "/dashboard",
    text: "Dashboard",
  },
  {
    to: "/staking",
    text: "Staking",
  },
];

const LeftNav = () => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  useLayoutEffect(() => {
    const screenWidth = window.screen.width;

    if (screenWidth < 640) {
      setOpen(false);
    }
  }, []);

  const handleDrawerClick = () => {
    setOpen(!open);
  };

  const handleLinkClick = (linkIndex: number) => {
    history.push(links[linkIndex].to);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClick}>
          {open === true ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {links.map((link, index) => (
          <ListItem
            button
            key={link.text}
            onClick={() => handleLinkClick(index)}
          >
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <div className="font-semibold">{link.text}</div>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default LeftNav;

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
    justifyContent: "space-between",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

const links: { to: string; text: string; icon: IconProp }[] = [
  {
    to: "/",
    text: "Home",
    icon: "home",
  },
  // {
  //   to: "/dashboard",
  //   text: "Dashboard",
  //   icon: "columns",
  // },
  {
    to: "/pooling",
    text: "Pooling",
    icon: "swimmer",
  },
  {
    to: "/farming",
    text: "Farming",
    icon: "tractor",
  },
  {
    to: "/bots",
    text: "Bots",
    icon: "robot",
  },
  {
    to: "/about",
    text: "About",
    icon: "users",
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
        {open ? (
          <>
            <img src="/logo.png" alt="App Logo" width="32" height="32"></img>
            <h1 className="text-3xl font-black">Radar</h1>
          </>
        ) : (
          <></>
        )}

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
              <FontAwesomeIcon icon={link.icon} />
            </ListItemIcon>
            <div className="font-semibold">{link.text}</div>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default LeftNav;

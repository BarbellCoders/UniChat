"use client";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import chatGPTLogo from "../../Assets/ChatGPT_icon.png";
import Logout from "@mui/icons-material/Logout";
import { logoutUser } from "../../Services/User";
import Settings from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import PolylineIcon from "@mui/icons-material/Polyline";
import SpokeIcon from "@mui/icons-material/Spoke";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import {
  IconButton,
  Badge,
  Button,
  Typography,
  Toolbar,
  InputBase,
  Box,
  Avatar,
  Stack,
  AppBar,
  styled,
  ThemeProvider,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import ThemeContext from "../Contexts/themeContext";
import AuthContext from "../Contexts/authContext";
import ChatGPTBox from "../ChatGPT/chatGPTBox";
import {
  getProjectDetails,
  joinProject,
} from "../../Services/ProjectWork/Project_Routines";

const StyledButton = styled(Button)(({ theme }) => ({
  width: "135px",
  height: "30px",
  borderRadius: 5,
  backgroundColor: theme.palette.primary.ButtonColor,
  color: theme.palette.primary.whites,
  "&:hover": {
    backgroundColor: theme.palette.primary.ButtonHover,
    color: theme.palette.primary.whites,
  },
  fontFamily: theme.typography.fontFamily[0],
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  color: theme.palette.primary.textcolor,
  "&:hover": {
    transform: "scale(1.17)",
    backgroundColor: "transparent",
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  // backgroundColor: theme.palette.primary.hover,
  marginRight: 0,
  height: "40px",
  width: "150px",
  marginLeft: 0,
  borderRadius: 6,
  "& .hoverIcon": {
    color: theme.palette.primary.ButtonHover,
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "400px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.primary.textcolor,
  height: "100%",
  width: "100%",
  fontSize: "14px",

  "& .MuiInputBase-input": {
    fontFamily: "'Kode Mono', monospace",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}));

const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({}));

export default function NavBar() {
  const router = new useRouter();
  const [openChatGPT, setOpenChatGPT] = useState(false);

  const [openJoinProjectDialog, setOpenJoinProjectDialog] = useState(false);
  const [requestedProjectID, setRequestedProjectID] = useState("");
  const [isRequestedProjectValid, setIsRequestedProjectValid] = useState(false);
  const [requestedProject, setRequestedProject] = useState({});
  const [loadingProject, setLoadingProject] = useState(false);
  const [findClicked, setFindClicked] = useState(false);
  const [projectJoinStatus, setProjectJoinStatus] = useState("initial");
  const [joiningProject, setJoiningProject] = useState(false);

  const handleFindProject = async (projectId) => {
    setLoadingProject(true);
    setFindClicked(true);
    console.log(`Joining project with ID: ${projectId}`);
    const projectDetails = await getProjectDetails(projectId);
    if (projectDetails.isValidProjectID) {
      console.log("Project details: ", projectDetails);
      setIsRequestedProjectValid(true);
      setRequestedProject(projectDetails.project);
    } else {
      console.log("Project not found");
      setIsRequestedProjectValid(false);
    }
    setLoadingProject(false);
  };

  const handleJoinProject = async () => {
    setJoiningProject(true);
    const result = await joinProject(
      localStorage.getItem("studentId"),
      requestedProjectID
    );
    if (result.status === 200) {
      setProjectJoinStatus("success");
      handleCloseJoinProjectDialog();
    } else {
      setProjectJoinStatus("failure");
    }
    setJoiningProject(false);
  };

  const handleOpenJoinProjectDialog = () => {
    setOpenJoinProjectDialog(true);
  };

  const handleCloseJoinProjectDialog = () => {
    setOpenJoinProjectDialog(false);
    setRequestedProjectID("");
    setIsRequestedProjectValid(false);
    setLoadingProject(false);
    setRequestedProject({});
    setFindClicked(false);
  };

  const toggleChatGPT = () => {
    setOpenChatGPT(!openChatGPT);
  };

  const handleChatGPTClose = () => {
    setOpenChatGPT(false);
  };

  const [anchorProfileMenu, setAnchorProfileMenu] = useState(null);
  const handleClickProfile = (event) => {
    setAnchorProfileMenu(event.currentTarget);
  };
  const handleCloseProfileMenu = () => {
    setAnchorProfileMenu(null);
  };

  const [anchorNewProjecteMenu, setAnchorNewProjectMenu] = useState(null);
  const handleNewProjectClick = (event) => {
    setAnchorNewProjectMenu(event.currentTarget);
  };

  const handleCloseNewProjectMenu = () => {
    setAnchorNewProjectMenu(null);
  };

  const { theme } = useContext(ThemeContext);

  const { userImage } = useContext(AuthContext);

  const logout = () => {
    logoutUser()
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.log("Error logging out: ", error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        sx={{
          borderRadius: 3,
          position: "fixed",
          width: { xl: "80%", lg: "75%", md: "68%", sm: "100%" },
          left: 344,
          top: 16,
          zIndex: 0,
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            borderRadius: 3,
          }}
        >
          <Search>
            <SearchIconWrapper>
              <div className="hoverIcon">
                <StyledSearchIcon />
              </div>
            </SearchIconWrapper>
            <div
              className="hoverIcon"
              style={{ width: "100%", height: "100%" }}
            >
              <StyledInputBase
                placeholder="Search or type a command"
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <StyledButton
                aria-controls="new-project-menu"
                aria-haspopup="true"
                onClick={handleNewProjectClick}
              >
                <AddIcon fontSize="small" />
                <Typography
                  sx={{
                    fontFamily: theme.typography.fontFamily[0],
                  }}
                >
                  Project
                </Typography>
              </StyledButton>
              <Menu
                id="new-project-menu"
                anchorEl={anchorNewProjecteMenu}
                keepMounted
                open={Boolean(anchorNewProjecteMenu)}
                onClose={handleCloseNewProjectMenu}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                sx={{ marginTop: 1 }}
              >
                <MenuItem onClick={handleCloseNewProjectMenu}>
                  <Typography
                    variant="inherit"
                    sx={{
                      fontFamily: theme.typography.fontFamily[0],
                    }}
                  >
                    <PolylineIcon fontSize="small" sx={{ mr: 1 }} />
                    Create a new project
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseNewProjectMenu();
                    handleOpenJoinProjectDialog();
                  }}
                  sx={{
                    fontFamily: theme.typography.fontFamily[0],
                  }}
                >
                  <SpokeIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="inherit">
                    Join an existing project
                  </Typography>
                </MenuItem>
                <Dialog
                  open={openJoinProjectDialog}
                  onClose={handleCloseJoinProjectDialog}
                >
                  <DialogTitle
                    sx={{
                      fontFamily: theme.typography.fontFamily[0],
                    }}
                  >
                    Join a Project
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      sx={{
                        fontFamily: theme.typography.fontFamily[0],
                      }}
                    >
                      Please enter the project ID:
                    </DialogContentText>
                    <Box display="flex" alignItems="center">
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        variant="standard"
                        color="warning"
                        label="Project ID"
                        type="text"
                        fullWidth
                        value={requestedProjectID}
                        onChange={(event) =>
                          setRequestedProjectID(event.target.value)
                        }
                      />
                      <Button
                        sx={{
                          fontFamily: theme.typography.fontFamily[0],
                          color: theme.palette.primary.textcolor,
                        }}
                        disabled={
                          requestedProjectID === "" || loadingProject === true
                        }
                        onClick={() => {
                          handleFindProject(requestedProjectID);
                          setLoadingProject(true);
                        }}
                      >
                        Find
                      </Button>
                    </Box>
                  </DialogContent>
                  {isRequestedProjectValid === true && findClicked === true ? (
                    <DialogContent>
                      <DialogContentText
                        sx={{
                          fontFamily: theme.typography.fontFamily[0],
                        }}
                      >
                        Project Found!
                      </DialogContentText>
                      <DialogContentText
                        sx={{
                          fontFamily: theme.typography.fontFamily[0],
                        }}
                      >
                        Name: {requestedProject.projectName}
                      </DialogContentText>
                      <DialogContentText
                        sx={{
                          fontFamily: theme.typography.fontFamily[0],
                        }}
                      >
                        Description: {requestedProject.projectDescription}
                      </DialogContentText>
                    </DialogContent>
                  ) : findClicked === true && loadingProject === false ? (
                    <DialogContent>
                      <DialogContentText
                        sx={{
                          fontFamily: theme.typography.fontFamily[0],
                        }}
                      >
                        Project not found. Please check the project ID and try
                        again.
                      </DialogContentText>
                    </DialogContent>
                  ) : null}
                  <DialogActions>
                    <Button
                      onClick={handleCloseJoinProjectDialog}
                      sx={{
                        fontFamily: theme.typography.fontFamily[0],
                        color: theme.palette.primary.textcolor,
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      sx={{
                        fontFamily: theme.typography.fontFamily[0],
                        color: theme.palette.primary.textcolor,
                      }}
                      onClick={() => {
                        handleJoinProject();
                      }}
                      disabled={!isRequestedProjectValid}
                    >
                      {joiningProject ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Join"
                      )}
                    </Button>
                  </DialogActions>
                </Dialog>
              </Menu>
              <StyledIconButton color="inherit" onClick={toggleChatGPT}>
                <Image
                  src={chatGPTLogo}
                  alt="ChatGPT Icon"
                  width={24}
                  height={24}
                />
              </StyledIconButton>
              <StyledIconButton
                aria-label="show new notifications"
                size="small"
              >
                <Badge
                  sx={{
                    ".MuiBadge-dot": {
                      backgroundColor: theme.palette.primary.ButtonHover,
                    },
                  }}
                  variant="dot"
                  overlap="circular"
                >
                  <NotificationsIcon />
                </Badge>
              </StyledIconButton>
              <StyledIconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="profile-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClickProfile}
              >
                <Avatar sx={{ height: 30, width: 30 }}>
                  <Image src={userImage} width={30} height={30} />
                </Avatar>
              </StyledIconButton>
              <Menu
                anchorEl={anchorProfileMenu}
                open={Boolean(anchorProfileMenu)}
                onClose={handleCloseProfileMenu}
                onClick={handleCloseProfileMenu}
                id="profile-menu"
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                sx={{ marginTop: 1 }}
              >
                <MenuItem onClick={handleCloseProfileMenu}>
                  <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseProfileMenu}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      {joiningProject === false && projectJoinStatus === "success" ? (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setProjectJoinStatus("initial")}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Project Joined
          </Alert>
        </Snackbar>
      ) : null}
      {joiningProject === false && projectJoinStatus === "failure" ? (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setProjectJoinStatus("initial")}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            Failed to Join Project
          </Alert>
        </Snackbar>
      ) : null}
      {openChatGPT && (
        <ChatGPTBox isOpen={openChatGPT} onClose={handleChatGPTClose} />
      )}
    </ThemeProvider>
  );
}

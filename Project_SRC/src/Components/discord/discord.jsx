import React from "react";
import Divider from "@mui/material/Divider";
import { ThemeProvider } from "@mui/system";
import { useContext, useState } from "react";
import ThemeContext from "../Contexts/themeContext";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Fade,
  Slide,
  Grow,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function Discord({ props }) {
  const { theme } = useContext(ThemeContext);

  const [openMore, setOpenMore] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});

  const handleClickOpenMore = (event) => {
    setOpenMore(true);
  };

  const handleCloseMore = () => {
    setOpenMore(false);
  };

  const [copied, setCopied] = React.useState(false);

  const handleCopy = (projectId) => {
    navigator.clipboard.writeText(projectId);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        {props[0] === "noProjectsFound" ? (
          <div
            key={props[0]}
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography
              variant="body1"
              style={{
                textAlign: "center",
                color: "white",
                fontFamily: '"Kode Mono", monospace',
              }}
            >
              No Projects Found
            </Typography>
          </div>
        ) : props[0] === "noProjectSelected" ? (
          <div
            key={props[1]}
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
          >
            <Slide
              direction="down"
              in={true}
              mountOnEnter
              unmountOnExit
              timeout={1000}
            >
              <Typography
                variant="h7"
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: theme.palette.primary.textcolor,
                  fontFamily: '"Kode Mono", monospace',
                  padding: "10px",
                }}
              >
                Select a project to view its discord server
              </Typography>
            </Slide>
            <Divider
              sx={{
                backgroundColor: theme.palette.primary.ButtonColor,
                width: "100%",
                mb: 3,
              }}
            />
            {props && (
              <Grid container spacing={3} sx={{ p: 2, cursor: "pointer" }}>
                {props[1].map((project) => (
                  <Grow in={true} timeout={1500}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          color: theme.palette.primary.textcolor,
                          backgroundColor: theme.palette.primary.main,
                          "&:hover": {
                            backgroundColor: theme.palette.primary.ButtonColor,
                            color: theme.palette.primary.whites,
                          },
                          boxShadow: theme.palette.primary.shadowGlow,
                          backdropFilter: "blur(2px)",
                          WebkitBackdropFilter: "blur(4px)",
                          WebkitBackdropFilter: "blur(16.3px)",
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          cursor: "pointer",
                        }}
                      >
                        <CardContent sx={{ cursor: "pointer" }}>
                          <Box display="flex" alignItems="center">
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontFamily: '"Kode Mono", monospace',
                                mr: 1,
                              }}
                              onClick={() => {
                                console.log(project);
                                localStorage.setItem("projectID", project._id);
                                if (project.nativeChat) {
                                  localStorage.setItem(
                                    "chatPlatform",
                                    "native"
                                  );
                                  localStorage.setItem(
                                    "projectName",
                                    project.projectName
                                  );
                                } else {
                                  localStorage.setItem(
                                    "chatPlatform",
                                    "discord"
                                  );
                                  localStorage.setItem(
                                    "discordServerId",
                                    project.discordServerId
                                  );
                                }
                              }}
                            >
                              {project.projectName}
                            </Typography>
                            <Tooltip title="More">
                              <IconButton
                                onClick={() => {
                                  setSelectedProject(project);
                                  handleClickOpenMore();
                                }}
                              >
                                <MoreHorizIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </CardContent>
                        <Dialog open={openMore} onClose={handleCloseMore}>
                          <DialogTitle
                            sx={{ fontFamily: '"Kode Mono", monospace' }}
                          >
                            Project Details
                          </DialogTitle>
                          <DialogContent>
                            <Typography
                              sx={{ fontFamily: '"Kode Mono", monospace' }}
                            >
                              Name: {selectedProject.projectName}
                            </Typography>
                            <Box display="flex" alignItems="center">
                              <Typography
                                sx={{ fontFamily: '"Kode Mono", monospace' }}
                              >
                                ID: {selectedProject._id}
                              </Typography>
                              <IconButton
                                onClick={() => handleCopy(selectedProject._id)}
                                sx={{
                                  ml: 1,
                                  p: 0,
                                  "&:hover": {
                                    backgroundColor: "transparent",
                                  },
                                }}
                              >
                                {copied ? (
                                  <CheckCircleOutlineIcon fontSize="small" />
                                ) : (
                                  <FileCopyOutlinedIcon fontSize="small" />
                                )}
                              </IconButton>
                            </Box>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 1,
                              }}
                            >
                              <InfoOutlinedIcon
                                fontSize="small"
                                sx={{ mr: 0.5 }}
                              />
                              Copy Project ID and send it to your friends for
                              joining
                            </Typography>
                          </DialogContent>
                        </Dialog>
                      </Card>
                    </Grid>
                  </Grow>
                ))}
              </Grid>
            )}
          </div>
        ) : (
          <div key={props[0]} style={{ height: "100%", width: "100%" }}>
            <iframe
              src={`https://e.widgetbot.io/channels/${props[0]}`}
              width="100%"
              height="100%"
            />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

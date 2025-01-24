import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

function Navbar({ userDetail, onLogout, projectView = false, projectDetail }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isAdmin = userDetail?.role === "admin";

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="success">
      <Toolbar>
        {projectView && projectDetail ? (
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Project Name - {projectDetail?.project_name}</span>
            <span style={{ marginRight: "30px" }}>
              Total Time - {projectDetail?.total_time} Hours
            </span>
          </Typography>
        ) : (
          <>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              {`Welcome to ${isAdmin ? "Admin View" : "User View"}`}
            </Typography>{" "}
          </>
        )}

        {!projectView && (
          <Box sx={{ marginRight: "20px" }}>
            <Tooltip title="User Details">
              <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  {userDetail?.name?.charAt(0).toUpperCase() || "U"}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {userDetail?.name?.charAt(0).toUpperCase() || "U"}
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {userDetail?.name || "User Name"}
                  </Typography>
                </Box>
              </MenuItem>

              {/* Display User Email */}
              <MenuItem>
                <Typography variant="body2">
                  {userDetail?.email || "user@example.com"}
                </Typography>
              </MenuItem>

              <Divider />

              <MenuItem>
                <Button
                  onClick={() => {
                    handleCloseMenu();
                    onLogout();
                  }}
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                      boxShadow: "none",
                    },
                  }}
                  variant="outlined"
                >
                  LogOut
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../../redux";
import { SidebarHeader } from "./SidebarHeader";


export const Sidebar = () => {
  const sidebarItems = useCategories();

  
  const drawer = (
    <div>
      <Divider />
      <List>
        {sidebarItems.map((sidebarItem) => {
          const { _id, name } = sidebarItem;
          return (
            <ListItem key={_id} disablePadding style={{ display: "block" }}>
              <Link
                to={`/products/categories/${name}?page=1&sort=name,asc`}
                style={{ textDecoration: "none" }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <ListItemText primary={name}/>
                  </ListItemIcon>
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
      <Divider />
    </div>
  );
  return (
    <div>
      <Divider />
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            width: "250px",
            height: "100%",
          },
        }}
        open={true}
      >
        <SidebarHeader />
        <List>{drawer}</List>
      </Drawer>
      <Divider />
    </div>
  );
};

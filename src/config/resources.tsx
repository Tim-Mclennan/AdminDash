import type { IResourceItem } from "@refinedev/core";

import {
  DashboardOutlined,
  ProjectOutlined,
  ShopOutlined,
} from "@ant-design/icons";

// This component will be used in the 'Refine' component in the App.tsx.

// Resources can perform actions which are similar to CRUD operations:
// list -> get all record (read)
// show -> get a single record (read)
// create -> create a record (create)
// edit -> update a record (update)
// delete -> delete a record (delete)
// or clone

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "companies",
    list: "/companies",
    show: "/companies/:id",
    create: "/companies/new",
    edit: "/companies/edit/:id",
    meta: {
      label: "Companies",
      icon: <ShopOutlined />,
    },
  },
  {
    name: "tasks",
    list: "/tasks",
    create: "/tasks/new",
    edit: "/tasks/edit/:id",
    meta: {
      label: "Tasks",
      icon: <ProjectOutlined />,
    },
  },
];
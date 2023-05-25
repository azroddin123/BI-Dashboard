import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserAndRolesContext from "../../../context/UserAndRolesContext";
// import { GlobalContext } from "../../../cotext/GlobalContext";
import CustomTable from "../../Layout/CustomTable";
import ActionPanel from "../../Layout/CustomTable/ActionPanel";
// import { userUrl } from "../../utils/urls";
import UserForm from "../UserForm";

export default function UserList() {
  // const { userList, fetchUserList, fetchRoleList, accessHandler } =
  //   useContext(GlobalContext);
  const { users : {data, isLoading, pagination : {page, setPage} }} = useContext(UserAndRolesContext);



  var columns = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "username",
      headerName: "Name",
      width: 130,
    },
    {
      field: "email",
      headerName: "Email",
      editable: false,
      width: 130,
    },
    {
      field: "role_id",
      headerName: "Role Name",
      editable: false,
      width: 150,
      renderCell: ({ row }) => row.role?.role_name,
    },  
    {
      field: "permissions",
      headerName: "Permissions",
      editable: false,
      minWidth: 700,

      flex: 1,
      renderCell : () => '---'
      // renderCell: (params) => {
      //   return accessHandler(params.row).join(" | ") || [];
      // },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <ActionPanel
            url={"/api/v1/users/"}
            id={params.row.id}
            modal={UserForm}
            name={params.row.username}
            data={params.row}
          />
        );
      },
    },
  ];
  useEffect(() => {
    // fetchUserList();
    // fetchRoleList();
  }, []);

  return (
    <CustomTable
      rows={data?.data?.rows || []}
      rowCount = {data?.data?.count || 0}
      // rows={userList}
      url="users"
      columns={columns}
      modal={UserForm}
      isLoading={isLoading}

      page = {page}
      setPage={setPage}

      
    />
  );
}

import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import UserAndRolesContext from "../../../context/UserAndRolesContext";
// import { GlobalContext } from "../../../cotext/GlobalContext";
import CustomTable from "../../Layout/CustomTable";
import ActionPanel from "../../Layout/CustomTable/ActionPanel";
// import { roleUrl } from "../../utils/urls";
import RoleForm from "../RoleForm";

export default function RoleList() {
  const {roles : {data, isLoading, pagination : {page, setPage} }} = useContext(UserAndRolesContext);
  // const { roleList, fetchRoleList } = useContext(GlobalContext);
  // const [roleList, setRoleList] = React.useState([]);

  // React.useEffect(() => {
  //   axios
  //     .get(roleUrl)
  //     .then((res) => setRoleList(res.data.data))
  //     .catch((err) => console.log("err user", err.response));
  // }, []);
  useEffect(() => {
    // fetchRoleList();
  }, []);
  const columns = [
    {
      field: "id",
      headerName: "No.",

      width: 100,
    },
    {
      field: "role_name",
      headerName: "Role Name",
      flex: 1,
      minWidth: 200,
      editable: false,
      // width: { md: 100, sm: 900 },
    },
    // {
    //   field: "permissions",
    //   headerName: "Permissions",
    //   width: 200,
    //   flex: 1,

    //   editable: false,
    //   renderCell: (params) => params.value.join(" | "),
    // },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <ActionPanel
            noDelete={true}
            url={"roles"}
            id={params.row.id}
            modal={RoleForm}
            name={params.row.role_name}
            data={params.row}
          />
        );
      },
    },
  ];
  return (
    <CustomTable
      rows={data?.data?.rows || []}
      rowCount = {data?.data?.count || 0}
      columns={columns}
      url="roles"
      modal={RoleForm}
      isLoading = {isLoading}
      page = {page}
      setPage={setPage}
    />
  );
}

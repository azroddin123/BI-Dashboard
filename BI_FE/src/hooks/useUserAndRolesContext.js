import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

const useUserAndRolesContext = () => {
// 
const intialRoleData = {
  role_name : ""
};
const initialUserData = {
  username : '',
  password : '',
  email : '',
  role_id : null,
  daily_revenue : false,
  monthly_revenue : false,
  revenue_actual : false,
  revenue_budget : false,
  pl_actual : false,
  pl_budget : false,
  str_report : false,
  pl_actual : false,
}
const [roleData, setRoleData] = useState(intialRoleData);
const [userData, setUserData] = useState(initialUserData);

const roleDataHandler = e => setRoleData({...roleData, [e.target.name] : e.target.value});
const userDataHandler = e => setUserData({...userData, [e.target.name] : e.target.value});


const [userPage, setUserPage] = useState(0);
const [rolePage, setRolePage] = useState(0);

// 

  const getRoles = () => axios.get("/api/v1/roles-list?page=" + rolePage);
  const postRole = (data) =>
    axios.post("/api/v1/roles", data);
  const putRole = (data) =>
    axios.put("/api/v1/roles/" + data.id, data);

  const getUsers = () => axios.get("/api/v1/users-list?page="+userPage);
  const postUser = (data) =>
    axios.post("/api/v1/users", data);
  const putUser = (data) =>
    axios.put("/api/v1/users/" + data.id, data);
  const deleteUser = (data) =>
    axios.delete("/api/v1/users/" + data.id);

  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    refetch: refetchRoles,
  } = useQuery(["roles-list",rolePage], getRoles);
  const {
    data: roleList,
    isLoading: isLoadingRoleList,
    refetch: refetchRoleList,
  } = useQuery("role-list", () => axios.get("/api/v1/roles"));

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    refetch: refetchUsers,
  } = useQuery(["users-list", userPage], getUsers);

  const { mutate: mutateRole, isLoading: isLoadingPostRole } = useMutation(
    postRole,
    {
      onSuccess: () => {
        toast.success("Role added");
        refetchRoles();
        refetchRoleList()
        setRoleData(intialRoleData)
      },
      onError: () => toast.error("Duplicate Role name not allowed"),
    }
  );
  const { mutate: mutateRolePut, isLoading: isLoadingPutRole } = useMutation(
    putRole,
    {
      onSuccess: () => {
        toast.success("Role updated");
        refetchRoles();
        refetchRoleList()
      },
      onError: () => toast.error("Something went wrong"),
    }
  );

  const { mutate: mutateUser, isLoading: isLoadingPostUser } = useMutation(
    postUser,
    {
      onSuccess: () => {
        toast.success("User added");
        setUserData(initialUserData)
      },
      onError: (err) => toast.error("This email user exist already"),
    }
  );
  const { mutate: mutateUserPut, isLoading: isLoadingPutUser } = useMutation(
    putUser,
    {
      onSuccess: () => {
        toast.success("User updated");
        refetchUsers();
      },
      onError: () => toast.error("Something went wrong"),
    }
  );
  const { mutate: mutateUserDelete, isLoading: isLoadingDeleteUser } =
    useMutation(deleteUser, {
      onSuccess: () => {
        toast.success("User Deleted");
        refetchUsers();
      },
      onError: () => toast.error("Something went wrong"),
    });
  return {
    roles: {
      list : { data : roleList, isLoading : isLoadingRoleList, refetch : refetchRoleList},
      pagination : {page : rolePage, setPage : setRolePage},
      data: rolesData,
      isLoading: isLoadingRoles,
      refetch: refetchRoles,
      postReq: {
        post: mutateRole,
        isLoading: isLoadingPostRole,
      },
      putReq: {
        put: mutateRolePut,
        isLoading: isLoadingPutRole,
      },
    },
    users: {
      pagination : {page : userPage, setPage : setUserPage},
      data: usersData,
      isLoading: isLoadingUsers,
      refetch: refetchUsers,
      postReq: {
        post: mutateUser,
        isLoading: isLoadingPostUser,
      },
      putReq: {
        put: mutateUserPut,
        isLoading: isLoadingPutUser,
      },
      deleteReq: {
        _delete: mutateUserDelete,
        isLoading: isLoadingDeleteUser,
      },
    },
    formDataContext : {
      roleData,
      setRoleData,
      roleDataHandler,
      userData,
      setUserData,
      userDataHandler
    }
  };
};

export default useUserAndRolesContext;

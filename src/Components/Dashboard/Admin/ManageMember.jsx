import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

const ManageMember = () => {
  const axiosSecure = useAxiosSecure();
 
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const  handleRemoveMember = (user) => {
    axiosSecure.patch(`/users/user/${user._id}`)
    .then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "error",
          title: `${user.name} is a User Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    })
  }

  // const handleMakeMember = (user) => {
  //   axiosSecure.patch(`/users/member/${user._id}`).then((res) => {
  //     console.log(res.data);
  //     if (res.data.modifiedCount > 0) {
  //       refetch();
  //       Swal.fire({
  //         // position: "top-center",
  //         icon: "success",
  //         title: `${user.name} is a Member Now!`,
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     }
  //   });
  // };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-evenly my-4 text-white bg-[#394251]">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        

        <TableContainer  component={Paper}>
          
          <Table>
          <TableHead style={{ border: '1px solid #EF5350' }}>
            <TableRow style={{ backgroundColor: '#2d2d2d' }}>
              <TableCell  style={{ color: 'white' }}>#</TableCell>
              <TableCell  style={{ color: 'white' }}>Name</TableCell>
              <TableCell  style={{ color: 'white' }}>Email</TableCell>
              <TableCell  style={{ color: 'white' }}>Role</TableCell>
              <TableCell  style={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {users.map((user, index) => (
              <TableRow
                key={user._id}
                style={{ border: '1px solid #EF5350' , backgroundColor: '#394251' }}
              >
                <TableCell  style={{ color: 'white' }}>{index + 1}</TableCell>
                <TableCell  style={{ color: 'white' }}>{user.name}</TableCell>
                <TableCell  style={{ color: 'white' }}>{user.email}</TableCell>
                <TableCell  style={{ color: 'white' }}>
                  {user.role === 'admin' ? (
                    'Admin'
                  ) : user.role === 'member' ? (
                    <button
                      onClick={() => handleRemoveMember(user)}
                      className="btn btn-md bg-red-400 text-white"
                    >
                      Remove Member
                    </button>
                  ) : (
                    'User'
                  )}
                </TableCell>
                <TableCell  style={{ color: 'white' }}>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="bg-red-500 text-white"></FaTrashAlt>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
          </Table>
        </TableContainer> 
      </div>
    </div>
  );
};

export default ManageMember;

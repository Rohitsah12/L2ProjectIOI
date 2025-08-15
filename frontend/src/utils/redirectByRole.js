const redirectByRole = (role, navigate) => {
    const roleRoutes = {
        STUDENT:"/student-dashboard",
        TEACHER:"/teacher-dashboard",
        INSTITUTION:"/institution-dashboard"
    }
    navigate(roleRoutes[role] || '/homepage');

 };

  export default redirectByRole;
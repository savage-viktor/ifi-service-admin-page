// import { useSelector } from "react-redux";
// import { getLoginStatus } from "../../redux/login/selectors";
import { useDispatch } from "react-redux";
import { login } from "../../redux/login/loginSlice";

// function Login() {
//   const isLogin = useSelector(getLoginStatus);
//   const dispatch = useDispatch();

//   return (
//     <div>
//       {isLogin && (
//         <button onClick={() => dispatch(logout(false))}>Loguot</button>
//       )}
//       {!isLogin && <button onClick={() => dispatch(login(true))}>Login</button>}
//       <div>Вхід {isLogin ? "залогінений" : "не залогінений"}</div>;
//     </div>
//   );
// }

// export default Login;

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// TODO remove, this demo shouldn't need to reset the theme.

export default function Login() {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (
      (data.get("email") === "viktor.dkn@gmail.com") &
      (data.get("password") === "incredible")
    ) {
      console.log("success");
      dispatch(login(true));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вхід
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Вхід
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

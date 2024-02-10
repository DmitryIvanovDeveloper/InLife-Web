import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Routes } from "../../Routes";
import useAuthenticationQueriesApi from "../../ThereGame.Api/Queries/AuthenticationQueriesApi";
import ISignUpModel from "../../ThereGame.Business/Models/ISignUpModel";
import { Status } from "../../ThereGame.Infrastructure/Statuses/Status";

const theme = createTheme();

export default function SignUpTeacher() {

    const [data, setData] = useState<ISignUpModel>({
        id: uuidv4(),
        name: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [authenticationError, setAuthenticationError] = useState<string>("");

    const navigate = useNavigate();

    const authenticationQueriesApi = useAuthenticationQueriesApi();

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setIsLoading(true);
        var typedResult = await authenticationQueriesApi.signUpTeacher(data);

        if (typedResult.status == Status.OK) {
            navigate(Routes.teacherProfile);
        }

        if (typedResult.status == Status.Conflict) {
            setAuthenticationError("The account already exist");
        }

        setIsLoading(false);
    };

    return (
        <ThemeProvider theme={theme}>
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
                        Sign up
                    </Typography>

                    {!authenticationError 
                        ? null
                        : <Typography color='red'>{authenticationError}</Typography>
                    }
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onChange={e => setData(p => ({ ...p, name: e.target.value }))}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={e => setData(p => ({ ...p, lastName: e.target.value }))}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={e => setData(p => ({ ...p, email: e.target.value }))}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={e => setData(p => ({ ...p, password: e.target.value }))}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox value="allowExtraEmails" color="primary" />
                                    }
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            loading={isLoading}
                        >
                            Sign Up
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => {
                                        navigate(Routes.signIn);
                                    }}
                                >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
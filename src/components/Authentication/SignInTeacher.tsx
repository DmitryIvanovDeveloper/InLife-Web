import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ISignInModel from '../../ThereGame.Business/Models/ISignInModel';
import useAuthenticationQueriesApi from '../../ThereGame.Api/Queries/AuthenticationQueriesApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../Routes';
import { Status } from '../../ThereGame.Infrastructure/Statuses/Status';
import { StatusDescription } from '../../ThereGame.Infrastructure/Statuses/StatusDescription';
import LoadingButton from '@mui/lab/LoadingButton';

const defaultTheme = createTheme();

export default function SignInTeacher() {
    const authenticationQueriesApi = useAuthenticationQueriesApi();
    const navigate = useNavigate();
    const [authenticationError, setAuthenticationError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [data, setData] = useState<ISignInModel>({
        email: "",
        password: ""
    });

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setIsLoading(true);

        var status = await authenticationQueriesApi.signInTeacher(data);
        if (status == Status.Unauthorized) {
            setAuthenticationError(StatusDescription.Unauthorized);
        }
        if (status == Status.InternalServerError) {
            setAuthenticationError(StatusDescription.InternalServerError);
        }
        if (status == Status.OK) {
            navigate(Routes.teacherProfile);
        }

        setIsLoading(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    {!authenticationError 
                        ? null
                        : <Typography color='red'>{authenticationError}</Typography>
                    }

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
                            onChange={e => setData(p => ({ ...p, email: e.target.value }))}
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
                            onChange={e => setData(p => ({ ...p, password: e.target.value }))}
                        />
                       
                        <LoadingButton
                            loading={isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => {
                                       navigate(Routes.signUpTeacher);
                                    }}
                                >
                                    {"Don't have an account? Sign Up"}

                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
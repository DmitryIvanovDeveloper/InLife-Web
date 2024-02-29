import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../Routes';
import useAuthenticationQueriesApi from '../../ThereGame.Api/Queries/AuthenticationQueriesApi';
import ISignInModel from '../../ThereGame.Business/Models/ISignInModel';
import { RoleType } from '../../ThereGame.Business/Util/Role';
import { Status } from '../../ThereGame.Infrastructure/Statuses/Status';
import { StatusDescription } from '../../ThereGame.Infrastructure/Statuses/StatusDescription';
import useTeacherQueriesApi from '../../ThereGame.Api/Queries/TeacherQueriesApi';

const defaultTheme = createTheme();

export default function SignIn() {
    const authenticationQueriesApi = useAuthenticationQueriesApi();
    const teacherQueriesApi = useTeacherQueriesApi();

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

        var result = await authenticationQueriesApi.signIn(data);

        if (result.status == Status.Unauthorized) {
            setAuthenticationError(StatusDescription.Unauthorized);
        }
        if (result.status == Status.InternalServerError) {
            setAuthenticationError(StatusDescription.InternalServerError);
        }
        if (result.status == Status.OK && result.data.role == RoleType.Teacher) {
            navigate(Routes.main);
        }

        if (result.status == Status.OK && result.data.role == RoleType.Student) {
            navigate(Routes.studentProfile);
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
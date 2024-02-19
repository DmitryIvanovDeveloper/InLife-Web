import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';
import Typography from '@mui/joy/Typography';
import { useEffect, useState } from 'react';
import Avatar from "react-avatar-edit";
import { useNavigate } from 'react-router-dom';
import { useTeacher } from '../../Data/useTeacher';
import { Routes } from '../../Routes';
import useTeacherQueriesApi from '../../ThereGame.Api/Queries/TeacherQueriesApi';
import { Status } from '../../ThereGame.Infrastructure/Statuses/Status';

export interface ITeacherBio {
    avatar: string,
    name: string,
    lastName: string,
    email: string,
}
export default function MyProfile() {
    const [teacher] = useTeacher();
    const teacherQueriesApi = useTeacherQueriesApi();
    const navigate = useNavigate();

    const [bio, setBio] = useState<ITeacherBio>({
        avatar: "",
        name: "",
        lastName: "",
        email: "",
    });
    const [preview, setPreview] = useState<string>();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    async function onSave() {
        if (!teacher) {
            return;
        }

        var status = await teacherQueriesApi.update(bio, teacher?.id);
        if (status == Status.OK) {
            navigate(Routes.main);
        }
    }
    function onClose() {
        setPreview("");
        setIsEdit(false);
    }
    
    function onCrop(pv: string) {
        setBio(prev => ({
            ...prev,
            avatar: pv
        }))
    }

    function onChangeName(name: string) {
        setBio(prev => ({
            ...prev,
            name: name
        }))
    }

    function onChangeLastName(lastName: string) {
        setBio(prev => ({
            ...prev,
            lastName: lastName
        }))
    }
    

    function onBeforeFileLoad(elem: any) {
        if (elem.target.files[0].size > 2000000) {
            alert("File is too big!");
            elem.target.value = "";
        }
    }

    useEffect(() => {
        if (!teacher) {
            return;
        }

        const bio: ITeacherBio = {
            avatar: teacher.avatar ?? "",
            name: teacher.name,
            lastName: teacher.lastName,
            email: teacher.email,
        }

        setBio(bio);
    }, [teacher]);

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Box
                sx={{
                    position: 'sticky',
                    top: { sm: -100, md: -110 },
                    bgcolor: 'background.body',
                    zIndex: 9995,
                }}
            >
                <Box sx={{ px: { xs: 2, md: 6 } }}>
                    <Breadcrumbs
                        size="sm"
                        aria-label="breadcrumbs"
                        separator={<ChevronRightRoundedIcon />}
                        sx={{ pl: 0 }}
                    >
                       <IconButton onClick={() => navigate(Routes.main)}>
                            <HomeRoundedIcon />
                       </IconButton>
                            
                    </Breadcrumbs>
                    <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                        My profile
                    </Typography>
                </Box>
                <Tabs
                    defaultValue={0}
                    sx={{
                        bgcolor: 'transparent',
                    }}
                >
                    <TabList
                        tabFlex={1}
                        size="sm"
                        sx={{
                            pl: { xs: 0, md: 4 },
                            justifyContent: 'left',
                            [`&& .${tabClasses.root}`]: {
                                fontWeight: '600',
                                flex: 'initial',
                                color: 'text.tertiary',
                                [`&.${tabClasses.selected}`]: {
                                    bgcolor: 'transparent',
                                    color: 'text.primary',
                                    '&::after': {
                                        height: '2px',
                                        bgcolor: 'primary.500',
                                    },
                                },
                            },
                        }}
                    >
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}>
                            Settings
                        </Tab>
                        {/* <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={1}>
                            Team
                        </Tab>
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={2}>
                            Plan
                        </Tab>
                        <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={3}>
                            Billing
                        </Tab> */}
                    </TabList>
                </Tabs>
            </Box>
            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                <Card>
                    <Box sx={{ mb: 1 }}>
                        <Typography level="title-md">Personal info</Typography>
                        <Typography level="body-sm">
                            Customize how your profile information will apper to the networks.
                        </Typography>
                    </Box>
                    <Divider />
                    <Stack
                        direction="row"
                        spacing={3}
                        sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
                    >

                        {isEdit
                            ? <Avatar
                                width={140}
                                height={140}
                                onCrop={onCrop}
                                onClose={onClose}
                                onBeforeFileLoad={onBeforeFileLoad}
                            />
                            : <Stack direction="column" spacing={1}>
                                <AspectRatio
                                    ratio="1"
                                    maxHeight={200}
                                    sx={{ flex: 1, width: 140, borderRadius: '100%' }}
                                >
                                    <img
                                        src={bio?.avatar}
                                        srcSet={preview}
                                        loading="lazy"
                                        alt=""
                                    />
                                </AspectRatio>
                                <IconButton
                                    aria-label="upload new picture"
                                    size="sm"
                                    variant="outlined"
                                    color="neutral"
                                    onClick={() => setIsEdit(true)}
                                    sx={{
                                        bgcolor: 'background.body',
                                        position: 'absolute',
                                        zIndex: 2,
                                        borderRadius: '50%',
                                        left: 120,
                                        top: 190,
                                        boxShadow: 'sm',
                                    }}
                                >
                                    <EditRoundedIcon />
                                </IconButton>
                            </Stack>

                        }
                        <Stack spacing={2} sx={{ flexGrow: 1 }}>
                            <Stack spacing={1}>
                                <FormLabel>Name</FormLabel>
                                <FormControl
                                    sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}
                                >
                                    <Input 
                                        onChange={(event) => onChangeName(event.target.value)} 
                                        value={bio.name} size="sm" 
                                        placeholder="First name" 
                                    />
                                    <Input 
                                        onChange={(event) => onChangeLastName(event.target.value)} 
                                        value={bio.lastName} size="sm" 
                                        placeholder="Last name" 
                                        sx={{ flexGrow: 1 }} 
                                    />
                                </FormControl>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <FormControl sx={{ flexGrow: 1 }}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        value={bio.email}
                                        size="sm"
                                        type="email"
                                        startDecorator={<EmailRoundedIcon />}
                                        placeholder="email"
                                        defaultValue="siriwatk@test.com"
                                        sx={{ flexGrow: 1 }}
                                        disabled={true}
                                    />
                                </FormControl>
                            </Stack>
                            {/* <CountrySelector /> */}
                        </Stack>
                    </Stack>
                   
                    <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
                        <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            <Button onClick={() => navigate(Routes.main)} size="sm" variant="outlined" color="neutral">
                                Cancel
                            </Button>
                            <Button onClick={onSave} size="sm" variant="solid">
                                Save
                            </Button>
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Stack>
        </Box>
    );
}
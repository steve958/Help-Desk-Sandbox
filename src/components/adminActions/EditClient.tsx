import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router';
import './AdminActions.css'
//CUSTOM COMPONENTS
import Toolbar from '../Toolbar/Toolbar';
import UserProfile from '../UserProfile/UserProfile';
//LOCAL HELPERS
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { CompanyProject, UserTypes, CompanyProjectUser } from '../../interfaces';
import { allCompProjConnectionCall, createCompProjUserConnectionCall, createSingleConnectionCall, allCompProjUserConnectionCall, editUserCall, deleteCompProjUserConnectionCall } from '../../helpers/apiCalls';
//MUI COMPONENTS AND TYPES
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { OutlinedInput } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
//MUI ICONS
import AddIcon from '@mui/icons-material/Add';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';

const EditClient = () => {
    const token = useAppSelector((state: RootState) => state.user.JWT)
    const types = useAppSelector((state: RootState) => state.filter.userTypes)
    const user = useAppSelector((state: RootState) => state.user.selectedUser)
    const navigate = useNavigate()
    const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
    const [value, setValue] = useState(user.userType.userTypeName);
    const [projectsList, setProjectsList] = useState<any>([])
    const [projectID, setProjectID] = useState<string>('');
    const [connectionsToDelete, setConnectionsToDelete] = useState<any>([])
    const [connectionsToCreate, setConnectionsToCreate] = useState<any>([])
    const [connectionsList, setConnectionsList] = useState<CompanyProject[] | []>([])
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    //input usestate instead userefs
    const [firstName, setFirstName] = useState<string>(user.firstName)
    const [lastName, setLastName] = useState<string>(user.lastName)
    const [email, setEmail] = useState<string>(user.email)
    const [phone, setPhone] = useState<string>(user.phone)
    const [userName, setUserName] = useState<string>(user.username)

    useEffect(() => {
        if (successMessage || errorMessage) {
            setTimeout(() => { setSuccessMessage(''); setErrorMessage('') }, 4000)
        }
        fetchAllConnections()

    }, [successMessage, errorMessage])

    useEffect(() => {
        console.log(connectionsToCreate);

    }, [connectionsToCreate])


    //MUI CONFIG
    const ColorButtonSubmit = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#398b93'),
        backgroundColor: '#f9a235',
        width: '200px',
        marginRight: '50px',
        '&:hover': {
            backgroundColor: '#19467c',
        },
    }));

    const ColorButtonDiscard = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#398b93'),
        backgroundColor: '#19467c8a',
        width: '200px',
        '&:hover': {
            backgroundColor: '#19467c',
        },
    }));

    function ButtonDiscard() {
        return (<ColorButtonDiscard variant='contained' disabled={!!successMessage || !!errorMessage} onClick={() => navigate('/allclients')}>Nazad na tabelu</ColorButtonDiscard>)
    }

    function ButtonSubmit() {
        return (
            <ColorButtonSubmit variant="contained" disabled={!!successMessage || !!errorMessage} onClick={handleSaveClient}>Ažuriraj korisnika</ColorButtonSubmit>
        );
    }

    function BasicSelect(props: any) {

        const { heading, value, setValue } = props
        const handleChange = (event: SelectChangeEvent) => {
            setValue(event.target.value as string);
        };

        return (
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        onChange={handleChange}
                        disabled
                        sx={{ color: '#19467c', marginTop: '5px', marginBottom: '5px', height: '50px', width: '180px' }}
                    >
                        {types.map((type: UserTypes) => {
                            return <MenuItem value={type.userTypeName} key={type.userTypeId}>{type.userTypeName}</MenuItem>
                        }
                        )}
                    </Select>
                </FormControl>
            </Box>
        );
    }

    function ConnectionSelect(props: any) {

        const { heading, projectID, setProjectID, setConnectionsToCreate, setConnectionsToDelete } = props
        const handleChange = (event: SelectChangeEvent) => {
            setProjectID(event.target.value as string)
        };

        return (
            <Box sx={{ width: 180 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={projectID}
                        onChange={handleChange}
                        placeholder='uvezani projekti'
                        sx={{ color: '#19467c', height: '50px', width: '180px', marginTop: '5px' }}
                    >
                        {connectionsList.map((connection: CompanyProject) => {
                            return <MenuItem value={connection.companyProjectId} key={connection.companyProjectId}>{connection.companyProjectName}</MenuItem>
                        }
                        )}
                    </Select>
                </FormControl>
            </Box>
        );
    }

    //fetch connection
    async function fetchAllConnections() {
        setConnectionsToCreate([])
        setConnectionsToDelete([])
        const list = await allCompProjConnectionCall(token)
        if (list) {
            setConnectionsList(list)
            const createdConnections = await allCompProjUserConnectionCall(token)
            if (createdConnections) {
                const projectListCreated = [] as any
                const filtered = createdConnections.filter((connection: CompanyProjectUser) => connection.userId === user.userId)
                filtered.forEach((connection: CompanyProjectUser) => {
                    projectListCreated.push(connection)
                })
                setProjectsList(projectListCreated)
            }
        }
    }

    // update client click
    async function handleSaveClient() {
        try {
            if (firstName && lastName && email && phone && userName) {
                const userData = {
                    firstName,
                    lastName,
                    email,
                    phone,
                    userName
                }
                const response = await editUserCall(token, user.userId, userData)
                if (response) {
                    if (response.userType.userTypeId === 1 || response.userType.userTypeId === 2) {
                        setSuccessMessage('Uspešno ažuriran korisnik')
                    }
                    else {
                        if (connectionsToDelete.length > 0) {
                            connectionsToDelete.forEach(async (id: string) => {
                                await deleteCompProjUserConnectionCall(token, id)
                            })
                        }
                        if (connectionsToCreate.length > 0) {
                            connectionsToCreate.forEach(async (id: string) => {
                                await createSingleConnectionCall(token, user.userId, id)
                            })
                        }
                    }
                    setSuccessMessage('Uspešno ažuriran korisnik')
                } else {
                    setErrorMessage('Došlo je do greške')
                }
            } else {
                setErrorMessage('Sva polja su obavezna')
            }
        } catch (error) {
            console.error(error)
        }
    }

    //adding connection
    function handleAddProject(value: string) {
        if (!projectsList.find((connection: CompanyProjectUser) => connection.companyProjectId === value) && value !== '') {
            setConnectionsToCreate((oldstate: any) => [...oldstate.filter((id: string) => id !== value), value])
            setProjectID('')
        }
    }

    //deleting connection from the list
    function handleDeleteProject(value: string) {
        setConnectionsToDelete((oldstate: any) => [...oldstate, value])
        setProjectsList((oldList: CompanyProjectUser[]) => [...oldList.filter((connection: CompanyProjectUser) => connection.companyProjectUserId !== value)])
    }


    return <div className='new_client_container'>
        <Toolbar handleClickAccount={() => {
            if (token) setShowUserProfile(true);
        }} />
        <UserProfile
            show={showUserProfile}
            onClose={() => setShowUserProfile(false)}
        />
        <span className='admin_icon_wrapper' style={{ width: '40vw' }}>
            <h3 className="headings">Podaci korisnika</h3>
            <CreateIcon style={{ color: '#19467c' }} />
        </span>
        <div className='new_client_wrapper'>
            {successMessage &&
                <span style={{ position: 'absolute', top: '120px', display: 'flex', alignItems: 'center', color: 'green' }}>
                    <CheckCircleOutlineIcon style={{ color: 'green', marginRight: '6px' }} />
                    <p>{successMessage}</p>
                </span>}
            {errorMessage &&
                <span style={{ position: 'absolute', top: '120px', display: "flex", alignItems: 'center', color: 'red' }}>
                    <ErrorOutlineIcon style={{ color: 'red', marginRight: '6px' }} />
                    <p>{errorMessage}</p>
                </span>}
            <div className='form_wrapper'>
                <div className='input_field_wrapper'>
                    <p>Tip korisnika:</p>
                    <BasicSelect heading='tip' value={value} setValue={setValue} />
                </div>
                <div className='input_field_wrapper'>
                    <p>Ime korisnika:</p>
                    <OutlinedInput
                        style={{
                            width: "180px",
                            height: '50px',
                            backgroundColor: 'white'
                        }}
                        type="text"
                        placeholder="ime"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className='input_field_wrapper'>
                    <p>Prezime korisnika:</p>
                    <OutlinedInput
                        style={{
                            width: "180px",
                            height: '50px',
                            backgroundColor: 'white'
                        }}
                        type="text"
                        placeholder="prezime"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className='input_field_wrapper'>
                    <p>E-mail korisnika:</p>
                    <OutlinedInput
                        style={{
                            width: "180px",
                            height: '50px',
                            backgroundColor: 'white'
                        }}
                        type="email"
                        placeholder="e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='input_field_wrapper'>
                    <p>Broj telefona korisnika:</p>
                    <OutlinedInput
                        style={{
                            width: "180px",
                            height: '50px',
                            backgroundColor: 'white'
                        }}
                        type="number"
                        value={phone}
                        placeholder="broj telefona"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className='input_field_wrapper'>
                    <p>Jedinstveno korisničko ime:</p>
                    <OutlinedInput
                        style={{
                            width: "180px",
                            height: '50px',
                            backgroundColor: 'white'
                        }}
                        type="text"
                        placeholder="korisničko ime"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
            </div>
            {(value === 'Client' || value === 'Client_Admin') && <div className='form_wrapper_expanded'>
                <div className='input_field_wrapper' style={{ position: 'relative' }}>
                    <p>Izabrati korisnikovu vezu sa projektima:</p>
                    <ConnectionSelect heading='uvezani projekti' projectID={projectID} setProjectID={setProjectID} setConnectionsToDelete={setConnectionsToDelete} setConnectionsToCreate={setConnectionsToCreate} />
                    <Tooltip title='DODAJ KORISNIKOV PROJEKAT NA LISTU'>
                        <span onClick={() => handleAddProject(projectID)} className='add_icon'>
                            <AddIcon style={{ width: '40px', height: '40px' }} />
                        </span>
                    </Tooltip>
                    <Tooltip title='OBRIŠI SVE PROJEKTE SA LISTE'>
                        <span className='clear_icon' onClick={() => setProjectsList([])}>
                            <ClearIcon style={{ width: '40px', height: '40px' }} />
                        </span>
                    </Tooltip>
                </div>
                {projectsList.length > 0 &&
                    (<div className='input_field_wrapper_projects'>
                        <p>Već povezani projekti:</p>
                        {projectsList.map((connection: CompanyProjectUser) => {
                            return <Tooltip key={connection.companyProjectUserId} title='KLIKNI DA OBRIŠEŠ PROJEKAT SA LISTE'>
                                <div className='project_field' onClick={() => handleDeleteProject(connection?.companyProjectUserId)}>{connection.companyProjectUserName?.slice(0, connection.companyProjectUserName?.lastIndexOf('-'))}</div>
                            </Tooltip>
                        }
                        )}
                    </div>)}
                {connectionsToCreate.length > 0 &&
                    (<div className='input_field_wrapper_projects'>
                        <p>Novi projekti:</p>
                        {connectionsToCreate.map((id: string) => {
                            return <Tooltip key={id} title='KLIKNI DA OBRIŠEŠ PROJEKAT SA LISTE'>
                                <div className='project_field' onClick={() => handleDeleteProject(id)}>{connectionsList.find((connection: CompanyProject) => connection.companyProjectId === id)?.companyProjectName}</div>
                            </Tooltip>
                        }
                        )}
                    </div>)}
            </div>}
        </div>
        <span className='submit_buttons_wrapper'>
            <ButtonSubmit></ButtonSubmit>
            <ButtonDiscard></ButtonDiscard>
        </span>
    </div>;
};

export default EditClient;

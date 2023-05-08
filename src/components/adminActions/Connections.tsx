import React, { useState, useEffect } from 'react'
import './AdminActions.css'
//CUSTOM COMPONENTS
import Toolbar from "../Toolbar/Toolbar";
import UserProfile from "../UserProfile/UserProfile";
//LOCAL HELPERS
import { Company, CompanyProject, Project } from '../../interfaces';
import { useAppSelector } from '../../app/hooks';
import { allCompProjConnectionCall, allCompaniesCall, allProjectsCall, createCompProjConnectionCall, deleteCompProjeConnectionCall } from '../../helpers/apiCalls'
//MUI COMPONENTS AND TYPES
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
//MUI ICONS
import CableIcon from '@mui/icons-material/Cable';
import BusinessIcon from '@mui/icons-material/Business';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Connections() {
    const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
    const [companiesList, setCompaniesList] = useState<Company[] | []>([])
    const [projectsList, setProjectsList] = useState<Project[] | []>([])
    const [connectionsList, setConnectionsList] = useState<CompanyProject[] | []>([])
    const [selectedCompany, setSelectedCompany] = useState<string>('')
    const [selectedProject, setSelectedProject] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const token = useAppSelector(state => state.user.JWT)

    useEffect(() => {
        if (successMessage || errorMessage) {
            setTimeout(() => { setSuccessMessage(''); setErrorMessage('') }, 4000)
        }
    }, [successMessage, errorMessage])

    useEffect(() => {
        fetchAllConnections()
        fetchAllCompanies()
        fetchAllProjects()
    }, [])

    //MUI CONFIG
    const ColorButtonSubmit = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#398b93'),
        backgroundColor: '#f9a235',
        '&:hover': {
            backgroundColor: '#19467c',
        },
    }));

    const ColorButtonDiscard = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#398b93'),
        marginRight: '10px',
        backgroundColor: '#19467c8a',
        '&:hover': {
            backgroundColor: '#19467c',
        },
    }));


    interface ButtonDiscardProps {
        handleDeleteConnection: () => Promise<void>
    }

    function ButtonDiscard(props: ButtonDiscardProps) {
        return (<ColorButtonDiscard variant='contained' disabled={!!successMessage || !!errorMessage} onClick={props.handleDeleteConnection}>Obriši vezu</ColorButtonDiscard>)
    }

    interface ButtonSubmitProps {
        handleCreateConnection: () => Promise<void>
    }

    function ButtonSubmit(props: ButtonSubmitProps) {
        return (
            <ColorButtonSubmit variant="contained" disabled={!!successMessage || !!errorMessage} onClick={props.handleCreateConnection}>Sačuvaj vezu</ColorButtonSubmit>
        );
    }

    async function fetchAllConnections() {
        const list = await allCompProjConnectionCall(token)
        setConnectionsList(list)
    }

    async function fetchAllProjects() {
        const list = await allProjectsCall(token)
        setProjectsList(list)
    }

    async function fetchAllCompanies() {
        const list = await allCompaniesCall(token)
        setCompaniesList(list)
    }

    async function handleCreateConnection() {
        if (selectedCompany && selectedProject) {
            const response = await createCompProjConnectionCall(token, selectedCompany, selectedProject)
            if (response) {
                setSuccessMessage('Uspešno kreirana konekcija između kompanije i projekta')
            } else {
                setErrorMessage('Konekcija je već kreirana')
            }
            fetchAllConnections()
        }
    }

    async function handleDeleteConnection() {
        if (selectedCompany && selectedProject) {
            const deleteId: [] | CompanyProject[] = connectionsList.filter((connection: CompanyProject) => selectedCompany === connection.companyId).filter((connection: CompanyProject) => selectedProject === connection.projectId)
            if (deleteId[0]?.companyProjectId) {
                const response = await deleteCompProjeConnectionCall(token, deleteId[0].companyProjectId)
                if (response) {
                    setSuccessMessage('Uspešno obrisana konekcija između kompanije i projekta')
                    fetchAllConnections()
                }
            } else {
                setErrorMessage('Konekcija nije ranije ostvarena')
            }
        }
    }

    return (
        <div className="app_container">
            <Toolbar
                handleClickAccount={() => {
                    if (token) setShowUserProfile(true);
                }}
            />
            <UserProfile
                show={showUserProfile}
                onClose={() => setShowUserProfile(false)}
            />
            <div className='connection_wrapper'>
                <span style={{ position: 'absolute', top: '120px', width: '600px', left: '40%', fontWeight: '600' }}>
                    {successMessage &&
                        <span style={{ display: 'flex', alignItems: 'center', color: '#19467c' }}>
                            <p>{successMessage}</p>
                            <CheckCircleOutlineIcon style={{ color: 'green' }} />
                        </span>}
                    {errorMessage &&
                        <span style={{ display: "flex", alignItems: 'center', color: 'red' }}>
                            <p>{errorMessage}</p>
                            <ErrorOutlineIcon style={{ color: 'red' }} />
                        </span>}
                </span>
                <span className="background" style={{ height: '80vh' }}></span>
                <span className="heading_icon_wrapper">
                    <h3 className="headings">Povezivanje kompanija i projekata</h3>
                    <CableIcon style={{ color: '#19467c' }} />
                </span>
                <div className='list_wrapper'>
                    <span className='list_field'>
                        <span className="heading_icon_wrapper" >
                            <h3 className="headings" style={{ fontSize: '20px' }}>Lista svih kompanija</h3>
                            <BusinessIcon style={{ color: '#19467c' }} />
                        </span>
                        {companiesList.length > 0 && companiesList.map((company: Company) => {
                            return <p className={selectedCompany === company.companyId ? 'selected' : undefined} onClick={() => { setSelectedCompany(company.companyId); setSelectedProject('') }} key={company.companyId}>{company.companyName}</p>
                        })}
                    </span>
                    <span className='list_field'>
                        <span className="heading_icon_wrapper">
                            <h3 className="headings" style={{ fontSize: '20px' }}>Lista svih projekata</h3>
                            <InsertDriveFileIcon style={{ color: '#19467c' }} />
                        </span>
                        {projectsList.length > 0 && projectsList.map((project: Project) => {
                            return <p className={selectedProject === project.projectId ? 'selected' : undefined} onClick={() => setSelectedProject(project.projectId)} key={project.projectId}>{project.projectName}</p>
                        })}
                    </span>
                    <span className='list_field_connections'>
                        <span className="heading_icon_wrapper">
                            <h3 className="headings" style={{ fontSize: '20px' }}>Lista konekcija</h3>
                            <BusinessIcon style={{ color: '#19467c' }} />
                            <CableIcon style={{ color: '#19467c' }} />
                            <InsertDriveFileIcon style={{ color: '#19467c' }} />
                        </span>
                        {connectionsList.length > 0 && connectionsList.filter((connection: CompanyProject) => connection.companyId === selectedCompany).map((connection: CompanyProject) => {
                            return <p key={connection.companyProjectId}>{connection.companyProjectName}</p>
                        })}
                    </span>
                </div>
                {selectedCompany && <span style={{ margin: '10px' }}>
                    <ButtonDiscard handleDeleteConnection={handleDeleteConnection} />
                    <ButtonSubmit handleCreateConnection={handleCreateConnection} />
                </span>}
            </div>
        </div >
    )
}

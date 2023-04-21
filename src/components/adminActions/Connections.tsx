import React, { useState } from 'react'
import Toolbar from "../Toolbar/Toolbar";
import UserProfile from "../UserProfile/UserProfile";
import { useSelector } from "react-redux";
import { state } from "../../main";
import './AdminActions.css'
import CableIcon from '@mui/icons-material/Cable';
import BusinessIcon from '@mui/icons-material/Business';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

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
    backgroundColor: '#19467c4a',
    '&:hover': {
        backgroundColor: '#19467c',
    },
}));

function ButtonDiscard() {
    return (<ColorButtonDiscard variant='contained'>Obriši vezu</ColorButtonDiscard>)
}

function ButtonSubmit() {
    return (
        <ColorButtonSubmit variant="contained">Sačuvaj vezu</ColorButtonSubmit>
    );
}




export default function Connections() {
    const authState = useSelector((state: state) => state.auth);
    const [showUserProfile, setShowUserProfile] = useState(false);
    const [selected, setSelected] = useState(false)
    return (
        <div className="app_container">
            <Toolbar
                handleClickAccount={() => {
                    if (authState["token"]) setShowUserProfile(true);
                }}
            />
            <UserProfile
                show={showUserProfile}
                onClose={() => setShowUserProfile(false)}
            />
            <div className='connection_wrapper'>
                <span className="background" style={{ height: '80vh' }}></span>
                <span className="heading_icon_wrapper">
                    <h3 className="headings">Povezivanje kompanija i projekata</h3>
                    <CableIcon style={{ color: '#19467c' }} />
                </span>
                <div className='list_wrapper'>
                    <span className='list_field'>
                        <span className="heading_icon_wrapper" >
                            <h3 className="headings" style={{ fontSize: '20px' }}>Lista kompanija</h3>
                            <BusinessIcon style={{ color: '#19467c' }} />
                        </span>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                    </span>
                    <span className='list_field'>
                        <span className="heading_icon_wrapper">
                            <h3 className="headings" style={{ fontSize: '20px' }}>Lista projekata</h3>
                            <InsertDriveFileIcon style={{ color: '#19467c' }} />
                        </span>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                        <p>asdasdasd</p>
                    </span>
                </div>
                <span style={{ margin: '10px' }}>
                    <ButtonDiscard />
                    <ButtonSubmit />
                </span>
            </div>
        </div>
    )
}

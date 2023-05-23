import React, { useEffect, useState } from 'react'
import './Ticket.css'
import { useNavigate } from 'react-router';
//LOCAL HELPERS
import { dateConverter } from '../../helpers/dateConverter'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Message } from '../../interfaces';
import { RootState } from '../../app/store';
import { allMessagesFromTicketCall, cancelTicketCall, createNewMessageCall, getSpecificTicketCall } from '../../helpers/apiCalls';
import { setSelectedTicket } from '../../features/user/userSlice';
//MUI COMPONENTS AND TYPES
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
//MUI ICONS
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupervisedUserCircle from '@mui/icons-material/SupervisedUserCircle';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import CachedIcon from '@mui/icons-material/Cached';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import CreateIcon from '@mui/icons-material/Create';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SettingsIcon from '@mui/icons-material/Settings';

export default function ClientViewTicket() {

    const [sendMessageClicked, setSendMessageClicked] = useState(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showCover, setShowCover] = useState<boolean>(false)
    const [messages, setMessages] = useState<Message[] | []>([])
    const [newMessage, setNewMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')

    const dispatch = useAppDispatch()
    const token = useAppSelector((state: RootState) => state.user.JWT)
    const ticket = useAppSelector((state: RootState) => state.user.userSelectedTicket)
    const navigate = useNavigate()
    const user = useAppSelector((state: RootState) => state.user.userData)

    useEffect(() => {
        if (sendMessageClicked) {
            const element = document.getElementsByClassName('send_message_field')
            element[0].scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [sendMessageClicked])

    useEffect(() => {
        if (errorMessage || successMessage) {
            const element = document.getElementsByClassName('heading_icon_wrapper')
            element[0].scrollIntoView({ behavior: 'smooth', block: 'start' })
            setTimeout(() => { setErrorMessage(''), setSuccessMessage('') }, 4000)
        }
    }, [errorMessage, successMessage])

    useEffect(() => {
        if (ticket.ticketStatus.ticketStatusId === 5) {
            setShowCover(true)
        } else {
            fetchMessages()
        }
    }, [])


    //MUI CONFIG
    const ColorButtonSubmit = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#398b93'),
        backgroundColor: '#f9a235',
        marginTop: '5px',
        marginBottom: '10px',
        marginRight: '10px',
        '&:hover': {
            backgroundColor: '#19467c',
        },
    }));

    const ColorButtonCancel = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#398b93'),
        backgroundColor: '#f9a235',
        marginRight: '50px',
        width: '200px',
        '&:hover': {
            backgroundColor: '#19467c',
        },
    }));

    const ColorButtonBack = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#398b93'),
        backgroundColor: '#19467c7a',
        width: '200px',
        '&:hover': {
            backgroundColor: '#19467c',
        },
    }));

    function ButtonSubmit() {
        return (
            <ColorButtonSubmit variant="contained" onClick={() => handleSendMessage()}>Pošalji poruku</ColorButtonSubmit>
        );
    }

    function ButtonCancel() {
        return <ColorButtonCancel variant="contained" onClick={() => setShowModal(true)}>Otkaži tiket</ColorButtonCancel>
    }

    function ButtonBack() {
        return <ColorButtonBack variant="contained" onClick={() => navigate("/clientdashboard")}>Nazad na tabelu</ColorButtonBack>
    }

    //cancel ticket
    async function handleTicketDelete() {
        const response = await cancelTicketCall(token, ticket.ticketId)
        if (response) {
            setShowCover(true)
        } else {
            setErrorMessage('Došlo je do greške pri otkazivanju tiketa')
        }
    }

    //sync ticket settings
    async function syncTicketData() {
        const response = await getSpecificTicketCall(token, ticket.ticketId)
        if (response) {
            dispatch(setSelectedTicket(response))
        }
    }

    //fetch all messages from ticket
    async function fetchMessages() {
        const response = await allMessagesFromTicketCall(token, ticket.ticketId)
        if (response) {
            setMessages(response)
            console.log(response);
        } else {
            console.log('greska pri dopremanju poruka');
        }
    }

    //send message 
    async function handleSendMessage() {
        if (!newMessage) {
            setErrorMessage('Dodajte sadržaj poruke')
        } else {
            const response = await createNewMessageCall(token, ticket.ticketId, newMessage)
            if (response) {
                setSuccessMessage('Uspešno ste poslali poruku')
                fetchMessages()
                syncTicketData()
                setNewMessage('')
                setSendMessageClicked(false)
            } else {
                setErrorMessage('Došlo je do greške pri slanju poruke')
            }
        }
    }

    //calc time spent on resolving the ticket
    function timeSpentCalculator() {
        let time = 0
        const filtered = messages.filter((message: Message) => message.timeSpent)
        filtered.forEach((message: Message) => {
            time += message.timeSpent
        })
        return time

    }

    //sync messages 
    function syncData() {
        fetchMessages()
    }

    return (
        <div className='view_ticket_wrapper'>
            {showModal && <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogContent>
                    <div>
                        <p style={{ fontSize: '25px', fontWeight: '600', color: '#19467c', textAlign: 'center' }}>{`Da li Ste sigurni da želite da otkažete ovaj tiket?`}</p>
                    </div>
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        style={{
                            width: "200px",
                            backgroundColor: "red",
                            color: "white",
                            marginBottom: '10px'
                        }}
                        onClick={() => { setShowModal(false); handleTicketDelete() }}
                    >
                        Da
                    </Button>
                    <Button
                        variant="contained"
                        style={{
                            width: "200px",
                            backgroundColor: "#19467c",
                            color: "white",
                            marginBottom: '10px'
                        }}
                        onClick={() => setShowModal(false)}
                    >
                        Ne
                    </Button>
                </DialogActions>
            </Dialog>}
            {errorMessage &&
                <span style={{ position: 'absolute', top: '120px', display: "flex", alignItems: 'center', color: 'red', fontWeight: '600' }}>
                    <ErrorOutlineIcon style={{ color: 'red', marginRight: '6px' }} />
                    <p>{errorMessage}</p>
                </span>}
            {successMessage &&
                <span style={{ position: 'absolute', top: '120px', display: "flex", alignItems: 'center', color: '#19467c', fontWeight: '600' }}>
                    <CheckCircleOutlineIcon style={{ color: 'green', marginRight: '6px' }} />
                    <p>{successMessage}</p>
                </span>}
            {showCover && <><span className='ticket_cover'></span>
                <span className='ticket_cover_text'>
                    <p>Tiket je otkazan i nije moguće menjati podešavanja na njemu</p>
                    <ButtonBack />
                </span></>}
            <span className='heading_icon_wrapper'>
                <h3 className="headings">Detalji tiketa</h3>
                <InfoIcon style={{ color: '#19467c' }} />
            </span>
            <div className='details_wrapper'>
                <span className='details_section'>
                    <span className='client'>
                        <p>Tiket kreiran:</p>
                        <p>{dateConverter(ticket.created)}</p>
                    </span>
                    <span className='client'>
                        <p>Naslov:</p>
                        <p>{ticket.title}</p>
                    </span>
                    <span className='client'>
                        <p>Tiket kreirao:</p>
                        <p>{`${ticket.creator.firstName} ${ticket.creator.lastName}`}</p>
                    </span>
                </span>
                <span className='details_section'>
                    <span className='client'>
                        <p>Povezan projekat:</p>
                        <p>{ticket.companyProjectUser.companyProjectUserName.slice(0, ticket.companyProjectUser.companyProjectUserName.lastIndexOf('-'))}</p>
                    </span>
                    <span className='support'>
                        <p>Poslednja promena:</p>
                        <p>{dateConverter(ticket.lastUpdated)}</p>
                    </span>
                    <span className='support' style={{ display: 'flex', alignItems: 'center' }}>
                        <p>Utrošeno vreme u rešavanju tiketa:</p>
                        <AccessTimeIcon />
                        <p>{timeSpentCalculator()} minuta</p>
                    </span>
                </span>
                <span className='details_section'>
                    <span className='support'>
                        <p>Prioritet:</p>
                        <p>{ticket.ticketPriority.ticketPriorityName}</p>
                    </span>
                    <span className='support'>
                        <p>Status:</p>
                        <p>{ticket.ticketStatus.ticketStatusName}</p>
                    </span>
                    <span className='support'>
                        <p>Tip:</p>
                        <p>{ticket.ticketType.ticketTypeName}</p>
                    </span>
                </span>
            </div>
            <span className='heading_icon_wrapper'>
                <h3 className="headings">Poruke pristigle na tiket</h3>
                <ForumIcon style={{ color: '#19467c' }} />
            </span>
            <div className='messages_container'>
                <span className='messages_wrapper'>
                    {messages.map((message: Message) => {
                        return <span key={message.messageId} id={message.message[0] === '*' ? 'system_message' : 'djoksa'} className={(message.sentBy.userType.userTypeId === 3 || message.sentBy.userType.userTypeId === 4) ? 'message_client' : 'message_support'}>
                            <span className='message_icon_wrapper'>
                                {(message.sentBy.userType.userTypeId === 3 || message.sentBy.userType.userTypeId === 4) &&
                                    <span style={{ width: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span>
                                            <AccountCircleIcon style={{ width: '40px', height: '40px' }} />
                                        </span>
                                        <span>
                                            {message.sentBy.firstName}{message.sentBy.lastName}
                                        </span>
                                    </span>}
                            </span>
                            <span>{(user.userType.userTypeId === 1 || user.userType.userTypeId === 2) && message.timeSpent ? message.timeSpent : ''}</span>
                            <span className='message_content'>
                                <span>{message.message.replace('*', 'promenjena podešavanja tiketa >>> ')}</span>
                                <span style={{ textAlign: 'end', fontWeight: '600', marginRight: '15px' }}>{message.sentTime ? dateConverter(message.sentTime) : ''}</span>
                            </span>
                            <span className='message_icon_wrapper' style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', right: '10px' }}>{message.timeSpent ? message.timeSpent : ''}</span>
                                {(message.sentBy.userType.userTypeId === 1 || message.sentBy.userType.userTypeId === 2) &&
                                    <span style={{ width: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span>
                                            <SupervisedUserCircle style={{ width: '40px', height: '40px' }} />
                                        </span>
                                        <span style={{ textAlign: 'center' }}>
                                            {`${message.sentBy.firstName} ${message.sentBy.lastName}`}
                                        </span>
                                    </span>}
                            </span>
                        </span>
                    })}
                </span>
                <span className='icon_wrapper'>
                    <Tooltip title='OSVEŽI DA VIDIŠ PRISTIGLE PORUKE'>
                        <span className='refresh_icon' onClick={() => syncData()}>
                            <CachedIcon style={{ color: '#19467c', width: '40px', height: '40px' }} />
                        </span>
                    </Tooltip>
                    <Tooltip title='POŠALJI PORUKU KORISNIČKOJ PODRŠCI'>
                        <span onClick={() => {
                            setSendMessageClicked(!sendMessageClicked);
                        }} className='send_message_icon'>
                            <ForwardToInboxIcon style={{ color: '#f9a235', width: '40px', height: '40px' }} />
                        </span>
                    </Tooltip>
                </span>
                {sendMessageClicked && (
                    <>
                        <span className="heading_icon_wrapper" style={{ width: '100%' }}>
                            <h3 className="headings">Slanje poruke korisničkoj podršci</h3>
                            <CreateIcon style={{ color: '#19467c' }} />
                        </span>
                        <div className='send_message_wrapper'>
                            <span>
                                <textarea className="send_message_field" style={{ marginTop: '10px' }} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                                <input type="file" className='add_files' multiple />
                                <ButtonSubmit />
                            </span>
                        </div>
                    </>
                )}
                {!sendMessageClicked && <span className='ticket_buttons_wrapper'>
                    <span>
                        <ButtonCancel />
                        <ButtonBack />
                    </span>
                </span>}
            </div >
        </div >
    )
}


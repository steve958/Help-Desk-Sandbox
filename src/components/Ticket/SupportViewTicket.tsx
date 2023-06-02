import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import './Ticket.css'
//LOCAL HELPERS
import { setSelectedTicket } from '../../features/user/userSlice';
import { allMessagesFromTicketCall, changeTicketSettingsCall, createNewMessageCall, getSpecificTicketCall } from '../../helpers/apiCalls';
import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Message, TicketPriority, TicketStatus, TicketType } from '../../interfaces';
import { dateConverter } from '../../helpers/dateConverter'
//MUI COMPONENTS AND TYPES
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//MUI ICONS
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupervisedUserCircle from '@mui/icons-material/SupervisedUserCircle';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import CachedIcon from '@mui/icons-material/Cached';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import CreateIcon from '@mui/icons-material/Create';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

export default function SupportViewTicket() {

    const token = useAppSelector((state: RootState) => state.user.JWT)
    const ticket = useAppSelector((state: RootState) => state.user.userSelectedTicket)
    const statuses = useAppSelector((state: RootState) => state.filter.ticketStatuses)
    const priorities = useAppSelector((state: RootState) => state.filter.ticketPriorities)
    const types = useAppSelector((state: RootState) => state.filter.ticketTypes)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [sendMessageClicked, setSendMessageClicked] = useState<boolean>(false)
    const [messages, setMessages] = useState<Message[] | []>([])
    const [newMessage, setNewMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [timeSpent, setTimeSpent] = useState<number>(0)
    const [selectedType, setSelectedType] = useState<number>(ticket.ticketType.ticketTypeId)
    const [selectedPriority, setSelectedPriority] = useState<number>(ticket.ticketPriority.ticketPriorityId)
    const [selectedStatus, setSelectedStatus] = useState<number>(ticket.ticketStatus.ticketStatusId)
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true)
    const [validateMessage, setValidateMessage] = useState<boolean>(false)
    const [validateTimeSpent, setValidateTimeSpent] = useState<boolean>(false)
    const [formatBold, setFormatBold] = useState<boolean>(false)
    const [formatItalic, setFormatItalic] = useState<boolean>(false)
    const [formatUnderline, setFormatUnderline] = useState<boolean>(false)

    useEffect(() => {
        fetchMessages()
    }, [])

    useEffect(() => {
        if (errorMessage || successMessage) {
            const element = document.getElementsByClassName('view_ticket_wrapper')
            element[0]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            setTimeout(() => { setErrorMessage(''), setSuccessMessage('') }, 4000)
        }
    }, [errorMessage, successMessage])

    useEffect(() => {
        if (sendMessageClicked) {
            if (ticket.ticketStatus.ticketStatusId === 5) {
                setErrorMessage('Nemoguće je poslati poruku na otkazan tiket')
                setSendMessageClicked(false)
            } else if (selectedType !== 4 && selectedPriority !== 4 && selectedStatus !== 6) {
                const element = document.getElementsByClassName('send_message_field')
                element[0]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            } else {
                setErrorMessage('Podešavanja tiketa potrebno promeniti')
                setSendMessageClicked(false)
            }
        }
    }, [sendMessageClicked])

    useEffect(() => {
        if (newMessage) {
            setValidateMessage(false)
        }
        if (timeSpent) {
            setValidateTimeSpent(false)
        }
    }, [newMessage, timeSpent])

    useEffect(() => {
        if (selectedPriority === ticket.ticketPriority.ticketPriorityId
            && selectedStatus === ticket.ticketStatus.ticketStatusId
            && selectedType === ticket.ticketType.ticketTypeId) {
            setSubmitButtonDisabled(true)
        } else {
            setSubmitButtonDisabled(false)
        }
    }, [selectedPriority, selectedStatus, selectedType, ticket])

    const ColorButtonSubmit = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#398b93'),
        backgroundColor: '#f9a235',
        width: '200px',
        marginRight: '50px',
        '&:hover': {
            backgroundColor: '#19467c',
        },
    }));

    const ColorButtonUpdate = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#398b93'),
        backgroundColor: '#f9a235',
        marginRight: '30px',
        padding: '14px',
        width: '200px',
        '&:hover': {
            backgroundColor: '#19467c',
        },
    }));

    const ColorButtonBack = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#398b93'),
        backgroundColor: '#19467c',
        width: '200px',
        '&:hover': {
            backgroundColor: '#19467c12a',
        },
    }));

    function ButtonSubmit() {
        return (
            <ColorButtonSubmit variant="contained" disabled={!!errorMessage || !!successMessage} onClick={() => handleSendMessage()}>Pošalji poruku</ColorButtonSubmit>
        );
    }

    function ButtonSettingsUpdate() {
        return (
            <ColorButtonUpdate variant="contained" disabled={(!!errorMessage || !!successMessage) || submitButtonDisabled} onClick={() => submitSettings()}>Primeni podešavanja</ColorButtonUpdate>
        );
    }

    function ButtonBack() {
        return <ColorButtonBack variant="contained" onClick={() => navigate("/supportdashboard")}>Nazad</ColorButtonBack>
    }

    function ButtonClose() {
        return <ColorButtonBack variant="contained" disabled={!!errorMessage || !!successMessage} onClick={() => { setSendMessageClicked(false); setNewMessage('') }}>Odustani</ColorButtonBack>
    }


    function TypeSelect(props: any) {

        const { heading } = props
        const handleChange = (event: SelectChangeEvent) => {
            setSelectedType(Number(event.target.value))
        };

        return (
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        type='number'
                        id="demo-simple-select"
                        value={String(selectedType)}
                        label={heading}
                        onChange={handleChange}
                        disabled={(!!errorMessage || !!successMessage) || ticket.ticketStatus.ticketStatusId === 5}
                    >{types.map((type: TicketType) => {
                        return <MenuItem key={type.ticketTypeId} value={type.ticketTypeId}>{type.ticketTypeName}</MenuItem>
                    })}
                    </Select>
                </FormControl>
            </Box>
        );
    }

    function PrioritySelect(props: any) {

        const { heading } = props
        const handleChange = (event: SelectChangeEvent) => {
            setSelectedPriority(Number(event.target.value));
        };

        return (
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={String(selectedPriority)}
                        label={heading}
                        onChange={handleChange}
                        disabled={(!!errorMessage || !!successMessage) || ticket.ticketStatus.ticketStatusId === 5}
                    > {priorities.map((priority: TicketPriority) => {
                        return <MenuItem key={priority.ticketPriorityId} value={priority.ticketPriorityId}>{priority.ticketPriorityName}</MenuItem>
                    })}
                    </Select>
                </FormControl>
            </Box>
        );
    }

    function StatusSelect(props: any) {

        const { heading } = props
        const handleChange = (event: SelectChangeEvent) => {
            setSelectedStatus(Number(event.target.value));
        };

        return (
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={String(selectedStatus)}
                        label={heading}
                        onChange={handleChange}
                        disabled={(!!errorMessage || !!successMessage) || ticket.ticketStatus.ticketStatusId === 5}
                    > {statuses.map((status: TicketStatus) => {
                        return <MenuItem key={status.ticketStatusId} value={status.ticketStatusId}>{status.ticketStatusName}</MenuItem>
                    })}
                    </Select>
                </FormControl>
            </Box>
        );
    }

    //fetch all messages from ticket
    async function fetchMessages() {
        const response = await allMessagesFromTicketCall(token, ticket.ticketId)
        if (response) {
            setMessages(response)

        } else {
            console.log('greska sa dopremanjem poruka');
        }
    }

    //change ticket settings 
    async function submitSettings() {
        try {
            if (ticket.ticketStatus.ticketStatusId === 5) {
                setErrorMessage('Nemoguće je promeniti podešavanja otkazanog tiketa')
                return
            }
            const settingsResponse = await changeTicketSettingsCall(token, ticket.ticketId, selectedStatus, selectedPriority, selectedType)
            if (settingsResponse) {
                dispatch(setSelectedTicket(settingsResponse))
                const message = `*Prioritet:${settingsResponse.ticketPriority.ticketPriorityName} | Status:${settingsResponse.ticketStatus.ticketStatusName} | Tip:${settingsResponse.ticketType.ticketTypeName}`
                const response = await createNewMessageCall(token, ticket.ticketId, message)
                if (response) {
                    setSuccessMessage('Uspešno promenjena podešavanja tiketa')
                    syncData()
                }
            } else {
                setErrorMessage('Došlo je do greške pri promeni podešavanja')
            }

        } catch (error) {
            console.error(error)
        }
    }

    //convert time spent to a string
    function stringConverter(time: number) {
        const string = time.toString()
        if (string[string.length - 1] === '1' && string !== '11') {
            return 'minut'
        } return 'minuta'
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

    //sync ticket settings
    async function syncTicketData() {
        const response = await getSpecificTicketCall(token, ticket.ticketId)
        if (response) {
            dispatch(setSelectedTicket(response))
        }
    }

    //create message with line break
    function createNewMessage(e: React.ChangeEvent<HTMLTextAreaElement> | any) {
        let messageContent = e.target.value
        if (e?.nativeEvent?.inputType === 'insertLineBreak') {
            messageContent = messageContent + '<br>'
        }
        setNewMessage(messageContent)
    }

    //send message 
    async function handleSendMessage() {
        let result = newMessage
        if (!newMessage) {
            setErrorMessage('Sadržaj poruke je obavezno polje')
            setValidateMessage(true)
        } else {
            if (timeSpent <= 0) {
                setErrorMessage('Utrošeno vreme ne sme biti negativan broj ili 0')
                setTimeSpent(0)
                setValidateTimeSpent(true)
                return
            }
            if (formatBold) {
                result = result + '<b>'
            }
            if (formatItalic) {
                result = result + '<i>'
            }
            if (formatUnderline) {
                result = result + '<u>'
            }
            const response = await createNewMessageCall(token, ticket.ticketId, result, timeSpent)
            if (response) {
                setSuccessMessage('Uspešno ste poslali poruku')
                syncTicketData()
                fetchMessages()
                setNewMessage('')
                setTimeSpent(0)
                setSendMessageClicked(false)
            } else {
                setErrorMessage('Došlo je do greške pri slanju poruke')
            }
        }
    }

    return (
        <div className='view_ticket_wrapper'>
            {errorMessage &&
                <span style={{ position: 'absolute', top: '120px', display: "flex", alignItems: 'center', color: 'red', fontWeight: '600' }}>
                    <ErrorOutlineIcon style={{ color: 'red', marginRight: '6px', }} />
                    <p>{errorMessage}</p>
                </span>}
            {successMessage &&
                <span style={{ position: 'absolute', top: '120px', display: "flex", alignItems: 'center', color: '#19467c', fontWeight: '600' }}>
                    <CheckCircleOutlineIcon style={{ color: 'green', marginRight: '6px' }} />
                    <p>{successMessage}</p>
                </span>}
            <span className='heading_icon_wrapper'>
                <h3 className="headings">Detalji tiketa</h3>
                <InfoIcon style={{ color: '#19467c' }} />
            </span>
            <div className='details_wrapper_support'>
                <span className='details_section_support'>
                    <span className='client'>
                        <p>Tiket kreiran:</p>
                        <p>{dateConverter(ticket.created)}</p>
                    </span>
                    <span className='client'>
                        <p>Naslov:</p>
                        <p>{ticket.title}</p>
                    </span>
                </span>
                <span className='details_section_support'>
                    <span className='support' style={{ display: 'flex', alignItems: 'center' }}>
                        <p>Utrošeno vreme u rešavanju tiketa:</p>
                        <AccessTimeIcon />
                        <p>{timeSpentCalculator()} minuta</p>
                    </span>
                    <span className='client'>
                        <p>Povezan projekat:</p>
                        <p>{ticket.companyProjectUser.companyProjectUserName.slice(0, ticket.companyProjectUser.companyProjectUserName.lastIndexOf('-'))}</p>
                    </span>
                </span>
            </div>
            <span className='heading_icon_wrapper'>
                <h3 className="headings">Detalji kreatora tiketa</h3>
                <InfoIcon style={{ color: '#19467c' }} />
            </span>
            <div className='details_wrapper_support'>
                <span className='details_section_support'>
                    <span className='client'>
                        <p>Ime korisnika:</p>
                        <p>{ticket.creator.firstName}</p>
                    </span>
                    <span className='client'>
                        <p>Prezime korisnika:</p>
                        <p>{ticket.creator.lastName}</p>
                    </span>
                </span>
                <span className='details_section_support'>
                    <span className='client'>
                        <p>E-mail korisnika:</p>
                        <p>{ticket.creator.email}</p>
                    </span>
                    <span className='client'>
                        <p>Broj telefona korisnika:</p>
                        <p>{ticket.creator.phone}</p>
                    </span>
                </span>
            </div>
            <span className='heading_icon_wrapper'>
                <h3 className="headings">Podešavanja tiketa</h3>
                <SettingsIcon style={{ color: '#19467c' }} />
            </span>
            <div className="ticket_settings_wrapper">
                <span style={{ marginLeft: '30px' }}>
                    <p>Postavi prioritet tiketa:</p>
                    <PrioritySelect heading='prioritet'>Priority</PrioritySelect>
                    <p>Postavi status tiketa:</p>
                    <StatusSelect heading='status' />
                    <p>Postavi tip tiketa:</p>
                    <TypeSelect heading='tip'>Type</TypeSelect>
                </span>
                <ButtonSettingsUpdate></ButtonSettingsUpdate>
            </div>
            <span className='heading_icon_wrapper'>
                <h3 className="headings">Poruke pristigle od korisnika</h3>
                <ForumIcon style={{ color: '#19467c' }} />
            </span>
            <div className='messages_container'>
                <span className='messages_wrapper'>
                    {messages.map((message: Message) => {
                        return <span key={message.messageId} id={message.message[0] === '*' ? 'system_message' : 'djoksa'} className={(message.sentBy.userType.userTypeId === 3 || message.sentBy.userType.userTypeId === 4) ? 'message_client' : 'message_support'}>
                            {(message.sentBy.userType.userTypeId === 3 || message.sentBy.userType.userTypeId === 4) ?
                                <span className='message_heading_client'>
                                    <span className='message_icon_wrapper' title={message.sentBy.userType.userTypeName}>
                                        <AccountCircleIcon style={{ width: '40px', height: '40px' }} />
                                        {message.sentBy.firstName}
                                        {' '}
                                        {message.sentBy.lastName}
                                        <span className='time_wrapper_client'>
                                            {message.sentTime ? dateConverter(message.sentTime) : ''}
                                        </span>

                                    </span>
                                </span> :
                                <span className='message_heading_support'>
                                    {message.timeSpent && <span className='time_spent_display'>utrošeno vreme na rešavanje {message.timeSpent} {stringConverter(message.timeSpent)}</span>}
                                    <span className='message_icon_wrapper' title={message.sentBy.userType.userTypeName}>
                                        <span className='time_wrapper_support'>
                                            {message.sentTime ? dateConverter(message.sentTime) : ''}
                                        </span>
                                        {message.sentBy.firstName}
                                        {' '}
                                        {message.sentBy.lastName}
                                        <SupervisedUserCircle style={{ width: '40px', height: '40px' }} />
                                    </span>
                                </span>
                            }
                            <span className='message_content' style={{ fontWeight: message.message.includes('<b>') ? '600' : '400', fontStyle: message.message.includes('<i>') ? 'italic' : 'normal', textDecoration: message.message.includes('<u>') ? 'underline' : 'none' }}>
                                <span><p>{message.message.replace('*', `${dateConverter(message.sentTime)} korisnik ${message.sentBy.firstName} ${message.sentBy.lastName} ${message.sentBy.firstName[message.sentBy.firstName.length - 1] === 'a' ? 'promenila' : 'promenio'} podešavanja tiketa >>> `).replace('<b>', '').replace('<i>', '').replace('<u>', '').replace('<br>', ' \n')}</p></span>
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
                    <Tooltip title='POŠALJI PORUKU KORISNIKU'>
                        <span onClick={() => {
                            setSendMessageClicked(!sendMessageClicked);
                        }} className='send_message_icon'>
                            <ForwardToInboxIcon style={{ color: '#f9a235', width: '40px', height: '40px' }} />
                        </span>
                    </Tooltip>
                </span>
            </div >
            {
                sendMessageClicked && (ticket.ticketType.ticketTypeId !== 4 && ticket.ticketPriority.ticketPriorityId !== 4 && ticket.ticketStatus.ticketStatusId !== 6) && (
                    <span className='send_message_container'>
                        <span className="heading_icon_wrapper">
                            <h3 className="headings">Slanje poruke korisniku</h3>
                            <CreateIcon style={{ color: '#19467c' }} />
                        </span>
                        <div className='send_message_wrapper_support'>
                            <span>
                                <span className='format_text_wrapper'>
                                    <span className='format_text_icon' id={formatBold ? 'active' : ''} onClick={() => formatBold ? setFormatBold(false) : setFormatBold(true)} style={{ marginLeft: '0' }}>
                                        <FormatBoldIcon />
                                    </span>
                                    <span className='format_text_icon' id={formatItalic ? 'active' : ''} onClick={() => formatItalic ? setFormatItalic(false) : setFormatItalic(true)}>
                                        <FormatItalicIcon />
                                    </span>
                                    <span className='format_text_icon' id={formatUnderline ? 'active' : ''} onClick={() => formatUnderline ? setFormatUnderline(false) : setFormatUnderline(true)}>
                                        <FormatUnderlinedIcon />
                                    </span>
                                </span>
                                <textarea className="send_message_field" id={validateMessage ? 'warning' : ''} placeholder={validateMessage ? 'potrebno uneti sadržaj poruke' : ''} style={{ marginTop: '10px', fontWeight: formatBold ? '600' : '400', textDecoration: formatUnderline ? 'underline' : 'none', fontStyle: formatItalic ? 'italic' : 'normal' }} onChange={(e) => createNewMessage(e)} />
                                <input type="file" className='add_files' multiple lang='sr' />
                                <div className='time_spent_wrapper'>
                                    <p>Postavi utrošeno vreme u minutima:</p>
                                    <input type="number" defaultValue={timeSpent} id={validateTimeSpent ? 'warning' : ''} min={0} onChange={(e) => setTimeSpent(Number(e.target.value))} />
                                </div>
                                <span style={{ display: 'flex', flexDirection: 'row', width: 'fit-content' }}>
                                    <ButtonSubmit />
                                    <ButtonClose />
                                </span>
                            </span>
                        </div>
                    </span>
                )
            }
            {
                !sendMessageClicked && <span className='ticket_buttons_wrapper'>
                    <span>
                        <ButtonBack />
                    </span>
                </span>
            }
        </div >
    )
}

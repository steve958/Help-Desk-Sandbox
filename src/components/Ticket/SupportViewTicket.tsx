import React, { useEffect, useState } from 'react'
import { dateConverter } from '../../helpers/dateConverter'
import './Ticket.css'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupervisedUserCircle from '@mui/icons-material/SupervisedUserCircle';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import CachedIcon from '@mui/icons-material/Cached';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import CreateIcon from '@mui/icons-material/Create';

export default function SupportViewTicket() {

    const [accordionHeading, setAccordionHeading] = useState('Show messages')
    const [sendMessageClicked, setSendMessageClicked] = useState(false)

    useEffect(() => {
        if (sendMessageClicked) {
            const element = document.getElementsByClassName('send_message_field')
            element[0].scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }, [sendMessageClicked])

    const ColorButtonSubmit = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#398b93'),
        backgroundColor: '#f9a235',
        marginRight: '0',
        '&:hover': {
            backgroundColor: '#19467c',
        },
    }));

    const ColorButtonUpdate = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#398b93'),
        backgroundColor: '#f9a235',
        marginRight: '10px',
        '&:hover': {
            backgroundColor: '#19467c',
        },
    }));

    function ButtonSubmit() {
        return (
            <ColorButtonSubmit variant="contained">SUBMIT MESSAGE</ColorButtonSubmit>
        );
    }

    function ButtonSettingsUpdate() {
        return (
            <ColorButtonUpdate variant="contained">SETTINGS UPDATE</ColorButtonUpdate>
        );
    }

    function BasicSelect(props: any) {
        const [value, setValue] = useState('');

        const { heading } = props
        const handleChange = (event: SelectChangeEvent) => {
            setValue(event.target.value as string);
        };

        return (
            <Box sx={{ minWidth: 180 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{heading}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label={heading}
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        );
    }

    function handleAccordionHeadingClick() {
        if (accordionHeading === 'Show messages') setAccordionHeading('Hide messages')
        else setAccordionHeading('Show messages')
    }


    return (
        <div className='view_ticket_wrapper'>
            <span className='heading_icon_wrapper'>
                <h3 className="headings">Ticket details</h3>
                <InfoIcon style={{ color: '#19467c' }} />
            </span>
            <div className='details_wrapper_support'>
                <span className='details_section_support'>
                    <span className='client'>
                        <p>Ticket Created:</p>
                        <p>{dateConverter(new Date())}</p>
                    </span>
                    <span className='client'>
                        <p>Title:</p>
                        <p>asdasdad</p>
                    </span>
                </span>
                <span className='details_section_support'>
                    <span className='client'>
                        <p>Company: asdasd asda sda /</p>
                        <p>Project: asdasdasdasd</p>
                    </span>
                    <span className='client'>
                        <p>Ticket created by:</p>
                        <p>Pera Trta</p>
                    </span>
                </span>
            </div>
            <span className='heading_icon_wrapper'>
                <h3 className="headings">Ticket settings</h3>
                <SettingsIcon style={{ color: '#19467c' }} />
            </span>
            <div className="ticket_settings_wrapper">
                <span>
                    <p>Set ticket type:</p>
                    <BasicSelect heading='type'>Type</BasicSelect>
                    <p>Set ticket priority:</p>
                    <BasicSelect heading='priority'>Priority</BasicSelect>
                    <p>Set ticket status:</p>
                    <BasicSelect heading='status' />
                </span>
                <ButtonSettingsUpdate></ButtonSettingsUpdate>
            </div>
            <span className='heading_icon_wrapper'>
                <h3 className="headings">Messages received</h3>
                <ForumIcon style={{ color: '#19467c' }} />
            </span>
            <div className='messages_container'>
                <Accordion sx={{ height: '80px', position: "relative" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        onClick={handleAccordionHeadingClick}
                    >
                        <AccordionDetails>
                            <Typography>
                                <span className='messages_heading'>
                                    {accordionHeading}
                                </span>
                            </Typography>
                        </AccordionDetails>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <span className='messages_wrapper'>
                                <span className='message_client'>
                                    <AccountCircleIcon style={{ width: '40px', height: '40px' }} />
                                    <p>Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Maxime eligendi asperiores
                                        iure dolor dolorum. Animi fugit numquam ipsam
                                        quisquam odio? Dolorum beatae in distinctio
                                        dolorem tempora architecto eaque, aspernatur,
                                        adipisci fuga facere odio similique veritatis,
                                        voluptates labore inventore voluptatum eligendi
                                        necessitatibus fugiat praesentium aliquid
                                        voluptatem. Modi corrupti voluptatem ullam
                                        odit.</p>
                                    <span className='attached_files_wrapper'>
                                        <Tooltip title='DOWNLOAD FILE'>
                                            <span className='file_wrapper'>
                                                <p>LAKSD</p><FilePresentIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip title='DOWNLOAD FILE'>
                                            <span className='file_wrapper'>
                                                <p>LAKSD</p><FilePresentIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip title='DOWNLOAD FILE'>
                                            <span className='file_wrapper'>
                                                <p>LAKSD</p><FilePresentIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip title='DOWNLOAD FILE'>
                                            <span className='file_wrapper'>
                                                <p>LAKSD</p><FilePresentIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip title='DOWNLOAD FILE'>
                                            <span className='file_wrapper'>
                                                <p>LAKSD</p><FilePresentIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip title='DOWNLOAD FILE'>
                                            <span className='file_wrapper'>
                                                <p>LAKSD</p><FilePresentIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip title='DOWNLOAD FILE'>
                                            <span className='file_wrapper'>
                                                <p>LAKSD</p><FilePresentIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip title='DOWNLOAD FILE'>
                                            <span className='file_wrapper'>
                                                <p>LAKSD</p><FilePresentIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip title='DOWNLOAD FILE'>
                                            <span className='file_wrapper'>
                                                <p>LAKSD</p><FilePresentIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip title='DOWNLOAD FILE'>
                                            <span className='file_wrapper'>
                                                <p>LAKSD</p><FilePresentIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip title='DOWNLOAD FILE'>
                                            <span className='file_wrapper'>
                                                <p>LAKSD</p><FilePresentIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip title='DOWNLOAD FILE'>
                                            <span className='file_wrapper'>
                                                <p>LAKSD</p><FilePresentIcon />
                                            </span>
                                        </Tooltip>
                                    </span>
                                </span>
                                <span className='message_support'>
                                    <span className='attached_files_wrapper'>
                                        <Tooltip title='DOWNLOAD FILE'>
                                            <span className='file_wrapper'>
                                                <p>LAKSD</p><FilePresentIcon />
                                            </span>
                                        </Tooltip>
                                        <Tooltip title='DOWNLOAD FILE'>
                                            <span className='file_wrapper'>
                                                <p>LAKSD</p><FilePresentIcon />
                                            </span>
                                        </Tooltip>
                                    </span>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. Natus modi et est optio tempore accusantium quos
                                        quasi error quis soluta.</p>
                                    <SupervisedUserCircle style={{ width: '40px', height: '40px' }} />
                                </span>
                                <span className='message_client'>
                                    <AccountCircleIcon style={{ width: '40px', height: '40px' }} />
                                    <p>Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit.</p>
                                </span>
                                <span className='message_client'>
                                    <AccountCircleIcon style={{ width: '40px', height: '40px' }} />
                                    <p>Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Maxime eligendi asperiores
                                        iure dolor dolorum. Animi fugit numquam ipsam
                                        quisquam odio? Dolorum beatae in distinctio
                                        dolorem tempora architecto eaque, aspernatur,
                                        adipisci fuga facere odio similique veritatis,
                                        voluptates labore inventore voluptatum eligendi
                                        necessitatibus fugiat praesentium aliquid
                                        voluptatem. Modi corrupti voluptatem ullam
                                        odit.</p>
                                </span>
                                <span className='message_support'>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. Natus modi et est.</p>
                                    <SupervisedUserCircle style={{ width: '40px', height: '40px' }} />
                                </span>
                                <span className='message_client'>
                                    <AccountCircleIcon style={{ width: '40px', height: '40px' }} />
                                    <p>Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Maxime eligendi asperiores
                                        iure dolor dolorum. Animi fugit numquam ipsam
                                        quisquam odio? Dolorum beatae in distinctio
                                        dol</p>
                                    <span className='attached_files_wrapper'>
                                        <Tooltip title='DOWNLOAD FILE'>
                                            <span className='file_wrapper'>
                                                <p>LAKSD</p><FilePresentIcon />
                                            </span>
                                        </Tooltip>
                                    </span>
                                </span>
                                <span className='message_client'>
                                    <AccountCircleIcon style={{ width: '40px', height: '40px' }} />
                                    <p>Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Maxime eligendi asperiores
                                        iure dolor dolorum. Animi fugit numquam ipsam
                                        quisquam odio? Dolorum beatae in distinctio
                                        dolorem tempora architecto eaque, aspernatur,
                                        adipisci fuga facere odio similique veritatis,
                                        voluptates labore inventore voluptatum eligendi
                                        necessitatibus fugiat praesentium aliquid
                                        voluptatem. Modi corrupti voluptatem ullam
                                        odit.</p>
                                </span>
                                <span className='message_support'>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. Natus modi et est optio tempore accusantium quos
                                        quasi error quis soluta.</p>
                                    <SupervisedUserCircle style={{ width: '40px', height: '40px' }} />
                                </span>
                                <span className='message_client'>
                                    <AccountCircleIcon style={{ width: '40px', height: '40px' }} />
                                    <p>Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit.</p>
                                </span>
                                <span className='message_client'>
                                    <AccountCircleIcon style={{ width: '40px', height: '40px' }} />
                                    <p>Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Maxime eligendi asperiores
                                        iure dolor dolorum. Animi fugit numquam ipsam
                                        quisquam odio? Dolorum beatae in distinctio
                                        dolorem tempora architecto eaque, aspernatur,
                                        adipisci fuga facere odio similique veritatis,
                                        voluptates labore inventore voluptatum eligendi
                                        necessitatibus fugiat praesentium aliquid
                                        voluptatem. Modi corrupti voluptatem ullam
                                        odit.</p>
                                </span>
                                <span className='message_support'>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing
                                        elit. Natus modi et est.</p>
                                    <SupervisedUserCircle style={{ width: '40px', height: '40px' }} />
                                </span>
                                <span className='message_client'>
                                    <AccountCircleIcon style={{ width: '40px', height: '40px' }} />
                                    <p>Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Maxime eligendi asperiores
                                        iure dolor dolorum. Animi fugit numquam ipsam
                                        quisquam odio? Dolorum beatae in distinctio
                                        dol</p>
                                </span>
                                <span className='icon_wrapper'>
                                    <Tooltip title='REFRESH TO SEE NEW MESSAGES'>
                                        <span className='refresh_icon'>
                                            <CachedIcon style={{ color: '#19467c', width: '40px', height: '40px' }} />
                                        </span>
                                    </Tooltip>
                                    <Tooltip title='SEND MESSAGE TO A CLIENT'>
                                        <span onClick={() => {
                                            setSendMessageClicked(!sendMessageClicked);
                                        }} className='send_message_icon'>
                                            <ForwardToInboxIcon style={{ color: '#f9a235', width: '40px', height: '40px' }} />
                                        </span>
                                    </Tooltip>
                                </span>
                                {sendMessageClicked && (
                                    <>
                                        <span className="heading_icon_wrapper">
                                            <h3 className="headings">Send message to a client</h3>
                                            <CreateIcon style={{ color: '#19467c' }} />
                                        </span>
                                        <div className='send_message_wrapper_support'>
                                            <span>
                                                <textarea className="send_message_field" />
                                                <input type="file" className='add_files' multiple />
                                                <ButtonSubmit />
                                            </span>
                                        </div>
                                    </>
                                )}
                            </span>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div >
        </div >
    )
}

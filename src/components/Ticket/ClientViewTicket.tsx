import React from 'react'
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

export default function ClientViewTicket() {

    const ColorButtonSubmit = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText('#398b93'),
        backgroundColor: '#f9a235',
        '&:hover': {
            backgroundColor: '#19467c',
        },
    }));

    function ButtonSubmit() {
        return (
            <ColorButtonSubmit variant="contained">Update ticket</ColorButtonSubmit>
        );
    }

    function handleSendMessageClick() {
        const element = document.getElementsByClassName('send_message_wrapper')
        element[0].scrollIntoView({ behavior: 'smooth', block: 'end' })
    }

    return (
        <div className='view_ticket_wrapper'>
            <h3 className="headings">Ticket details</h3>
            <div className='details_wrapper'>
                <span className='details_section'>
                    <span className='client'>
                        <p>Ticket Created:</p>
                        <p>{dateConverter(new Date())}</p>
                    </span>
                    <span className='support'>
                        <p>Last Update:</p>
                        <p>{dateConverter(new Date())}</p>
                    </span>
                </span>
                <span className='details_section'>
                    <span className='client'>
                        <p>Company:</p>
                        <p>asdasdas</p>
                    </span>
                    <span className='client'>
                        <p>Project:</p>
                        <p>asdasdas</p>
                    </span>
                </span>
                <span className='details_section'>
                    <span className='client'>
                        <p>Title:</p>
                        <p>asdasdad</p>
                    </span>
                    <span className='support'>
                        <p>Ticket status:</p>
                        <p>asdasdasd</p>
                    </span>
                </span>
            </div>
            <h3 className="headings">Send message to customer support</h3>
            <div className='send_message_wrapper'>
                <span>
                    <textarea className="send_message_field" />
                    <input type="file" className='add_files' multiple />
                </span>
                <span>
                    <ButtonSubmit />
                </span>
            </div>
            <h3 className="headings">Customer support response</h3>
            <div className='messages_container'>
                <Accordion sx={{ height: '80px', position: "relative" }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <AccordionDetails>
                            <Typography>
                                <p className='messages_heading'>
                                    SHOW MESSAGES
                                </p>
                            </Typography>
                        </AccordionDetails>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <div className='messages_wrapper'>
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
                                    <span className='refresh_icon' title='synchronize messages'>
                                        <CachedIcon style={{ color: '#19467c', width: '40px', height: '40px' }} />
                                    </span>
                                    <span onClick={handleSendMessageClick} title='send message' className='send_message_icon'>
                                        <ForwardToInboxIcon style={{ color: '#f9a235', width: '40px', height: '40px' }} />
                                    </span>
                                </span>
                            </div>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div >
        </div >
    )
}

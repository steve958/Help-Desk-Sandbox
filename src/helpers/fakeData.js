import { dateConverter } from './dateConverter'
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';



// fake data for Data Table from MUI

export const dataDT = [
    {
        id: 1,
        created: dateConverter(new Date()),
        status: 'work in progress',
        update: dateConverter(new Date()),
        title: 'crash',
        response: <FeedbackRoundedIcon></FeedbackRoundedIcon>,
        project: 'project 1',
        company: 'company 1'
    }, {
        id: 2,
        created: dateConverter(new Date()),
        status: 'work in progress',
        update: dateConverter(new Date()),
        title: 'crash',
        response: <FeedbackRoundedIcon></FeedbackRoundedIcon>,
        project: 'project 1',
        company: 'company 1'
    }, {
        id: 3,
        created: dateConverter(new Date()),
        status: 'work in progress',
        update: dateConverter(new Date()),
        title: 'crash',
        response: <FeedbackRoundedIcon></FeedbackRoundedIcon>,
        project: 'project 1',
        company: 'company 1'
    }, {
        id: 4,
        created: dateConverter(new Date()),
        status: 'work in progress',
        update: dateConverter(new Date()),
        title: 'crash',
        response: <FeedbackRoundedIcon></FeedbackRoundedIcon>,
        project: 'project 1',
        company: 'company 1'
    }, {
        id: 5,
        created: dateConverter(new Date()),
        status: 'work in progress',
        update: dateConverter(new Date()),
        title: 'crash',
        response: <FeedbackRoundedIcon></FeedbackRoundedIcon>,
        project: 'project 1',
        company: 'company 1'
    }, {
        id: 6,
        created: dateConverter(new Date()),
        status: 'work in progress',
        update: dateConverter(new Date()),
        title: 'crash',
        response: <FeedbackRoundedIcon></FeedbackRoundedIcon>,
        project: 'project 1',
        company: 'company 1'
    }, {
        id: 7,
        created: dateConverter(new Date()),
        status: 'work in progress',
        update: dateConverter(new Date()),
        title: 'crash',
        response: <FeedbackRoundedIcon></FeedbackRoundedIcon>,
        project: 'project 1',
        company: 'company 1'
    }, {
        id: 8,
        created: dateConverter(new Date()),
        status: 'work in progress',
        update: dateConverter(new Date()),
        title: 'crash',
        response: <FeedbackRoundedIcon></FeedbackRoundedIcon>,
        project: 'project 1',
        company: 'company 1'
    }, {
        id: 9,
        created: dateConverter(new Date()),
        status: 'work in progress',
        update: dateConverter(new Date()),
        title: 'crash',
        response: <FeedbackRoundedIcon></FeedbackRoundedIcon>,
        project: 'project 1',
        company: 'company 1'
    }, {
        id: 10,
        created: dateConverter(new Date()),
        status: 'work in progress',
        update: dateConverter(new Date()),
        title: 'crash',
        response: <FeedbackRoundedIcon></FeedbackRoundedIcon>,
        project: 'project 1',
        company: 'company 1'
    }, {
        id: 11,
        created: dateConverter(new Date()),
        status: 'work in progress',
        update: dateConverter(new Date()),
        title: 'crash',
        response: <FeedbackRoundedIcon></FeedbackRoundedIcon>,
        project: 'project 1',
        company: 'company 1'
    }, {
        id: 12,
        created: dateConverter(new Date()),
        status: 'work in progress',
        update: dateConverter(new Date()),
        title: 'crash',
        response: <FeedbackRoundedIcon></FeedbackRoundedIcon>,
        project: 'project 1',
        company: 'company 1'
    }
]

// fake data for Customized Table from MUI

function createData(id, created, status, last_update, title, response, project, company) {
    return { id, created, status, last_update, title, response, project, company };
}

export const dataCT = [
    createData(1, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 2', 'company 1'),
    createData(2, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 2', 'company 1'),
    createData(3, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 112', 'company 2'),
    createData(4, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 21', 'company 3'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
];
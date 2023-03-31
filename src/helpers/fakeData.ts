
function createData(id: number, created: Date, status: string, last_update: Date, title: string, response: string, project: string, company: string) {
    return { id, created, status, last_update, title, response, project, company };
}

export const data = [
    createData(1, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 2', 'company 1'),
    createData(2, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 2', 'company 1'),
    createData(3, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 112', 'company 2'),
    createData(4, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 21', 'company 3'),
    createData(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(6, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(7, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(8, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(9, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(10, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(11, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(12, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(13, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(14, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(15, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(16, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(17, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(18, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(19, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(20, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(21, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(22, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(23, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(24, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(25, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(26, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(27, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(28, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
    createData(29, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4'),
];


function createSupportDate(id: number, created: Date, status: string, last_update: Date, title: string, response: string, project: string, company: string, priority: string, type: string) {
    return { id, created, status, last_update, title, response, project, company, priority, type };
}

export const supportData = [
    createSupportDate(1, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 2', 'company 1', 'high', 'BUG'),
    createSupportDate(2, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 2', 'company 1', 'high', 'BUG'),
    createSupportDate(3, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 112', 'company 2', 'high', 'BUG'),
    createSupportDate(4, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 21', 'company 3', 'high', 'BUG'),
    createSupportDate(5, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'high', 'BUG'),
    createSupportDate(6, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'high', 'BUG'),
    createSupportDate(7, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'high', 'BUG'),
    createSupportDate(8, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'high', 'BUG'),
    createSupportDate(9, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'high', 'BUG'),
    createSupportDate(10, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'high', 'BUG'),
    createSupportDate(11, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'high', 'BUG'),
    createSupportDate(12, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'low', 'update'),
    createSupportDate(13, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'low', 'update'),
    createSupportDate(14, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'low', 'update'),
    createSupportDate(15, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'low', 'update'),
    createSupportDate(16, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'low', 'update'),
    createSupportDate(17, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'low', 'update'),
    createSupportDate(18, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'low', 'update'),
    createSupportDate(19, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'medium', 'feature'),
    createSupportDate(20, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'medium', 'feature'),
    createSupportDate(21, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'medium', 'feature'),
    createSupportDate(22, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'medium', 'feature'),
    createSupportDate(23, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'medium', 'feature'),
    createSupportDate(24, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'medium', 'feature'),
    createSupportDate(25, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'medium', 'feature'),
    createSupportDate(26, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'high', 'BUG'),
    createSupportDate(27, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'high', 'BUG'),
    createSupportDate(28, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'high', 'BUG'),
    createSupportDate(29, new Date(), 'work in progress', new Date(), 'crash', 'message', 'project 22', 'company 4', 'high', 'BUG')
]
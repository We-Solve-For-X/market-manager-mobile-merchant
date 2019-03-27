export const message1 = {
    id: 'UUID',
    topic: 'Message Topic',
    text: 'This is a message. This is the body of the message. It is what is in the ',
    fromId: 'UUID',
    fromName: 'From User',
    toType: 'Host', //TargetType = [Host, Market]
    toName: 'Irene Market Merchants',
    toId: 'UUID',
    createdAt: '2019-03-27T11:32:29.098Z'
}

export const message2 = {
    id: 'UUID',
    topic: 'Message 2 Topic',
    text: 'This is another message. This is the body of the message. It is what is in the ',
    fromId: 'UUID',
    fromName: 'Second User',
    toType: 'Host', //TargetType = [Host, Market]
    toName: '14 April Market Merchants',
    toId: 'UUID',
    createdAt: '2019-02-12T15:12:29.098Z'
}

export const messageList = [message1, message2, message1, message2]

export const merchant1 = {
    id: 'UUID',
    hostId: 'UUID',
    authId: 'UUID',
    status: 'AwaitingApp', //MerchStatus = [AwaitingApp, Approved, Declined, Removed]
    isActive: true,
    name: 'Name',
    surname: 'Surname',
    email: 'merchant@gmail.com',
    cell: '08212345667',
    standName: 'Stand Name',
    businessName: 'Business Name Pty Ltd',
    standDescription: 'This stand sells this & that'
}

export const merchant2 = {
    id: 'UUID',
    hostId: 'UUID',
    authId: 'UUID',
    status: 'AwaitingApp', //MerchStatus = [AwaitingApp, Approved, Declined, Removed]
    isActive: true,
    name: 'Name 2',
    surname: 'Surname 2',
    email: 'merchant@gmail.com 2',
    cell: '08212345667',
    standName: 'Stand Name 2',
    businessName: 'Business Name 2 Pty Ltd',
    standDescription: 'This stand sells that & this'
}

export const merchant3 = {
    id: 'UUID',
    hostId: 'UUID',
    authId: 'UUID',
    status: 'Approved', //MerchStatus = [AwaitingApp, Approved, Declined, Removed]
    isActive: true,
    name: 'Name 3',
    surname: 'Surname 3',
    email: 'merchant@gmail.com',
    cell: '08212345667',
    standName: 'Stand Name',
    businessName: 'Business Name Pty Ltd',
    standDescription: 'This stand sells this & that'
}

export const merchant4 = {
    id: 'UUID',
    hostId: 'UUID',
    authId: 'UUID',
    status: 'Approved', //MerchStatus = [AwaitingApp, Approved, Declined, Removed]
    isActive: true,
    name: 'Name 4',
    surname: 'Surname 4',
    email: 'merchant@gmail.com 4',
    cell: '08212345667',
    standName: 'Stand Name 4',
    businessName: 'Business Name 4 Pty Ltd',
    standDescription: 'This stand sells that & this'
}

export const merchantsAwaiting = [merchant1, merchant2]

export const merchantsApproved = [merchant3, merchant4, merchant3, merchant4]
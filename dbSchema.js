let db = {
    users: [
        {
            userId: 'dh23ggj5h32g543j5gf43',
            email: 'user@email.com',
            handle: 'user',
            createdAt: '2019-03-15T10:59:52.798Z',
            imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
            bio: 'Hello, my name is user, nice to meet you',
            website: 'https://user.com',
            location: 'Lonodn, UK'
        }
    ],
    screams: [
        {
            userHandle: 'user',
            body: 'This is a sample scream',
            createdAt: '2019-03-15T10:59:52.798Z',
            likeCount: 5,
            commentCount: 3
        }
    ],
    comments: [
        {
            screamId: 'kdjsfgdksuufhgkdsufky',
            userHandle: 'user',
            body: 'nice one mate!',
            createdAt: '2019-03-15T10:59:52.798Z'
        },
        {
            screamId: 'RcBUUkOx0QuFWQ3uobbm',
            userHandle: 'stabja14',
            body: 'How are you man!',
            createdAt: '2019-09-06T12:59:52.798Z'
        }
    ],
    notifications: [
        {
            recipient: 'user',
            sender: 'john',
            read: 'true | false',
            screamId: 'kdjsfgdksuufhgkdsufky',
            type: 'like | comment',
            createdAt: '2019-03-15T10:59:52.798Z'
        }
    ]
};
const userDetails = {
    // Redux data
    credentials: {
        userId: 'N43KJ5H43KJHREW4J5H3JWMERHB',
        email: 'user@email.com',
        handle: 'user',
        createdAt: '2019-03-15T10:59:52.798Z',
        imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
        bio: 'Hello, my name is user, nice to meet you',
        website: 'https://user.com',
        location: 'Lonodn, UK'
    },
    likes: [
        {
            userHandle: 'user',
            screamId: 'hh7O5oWfWucVzGbHH2pa'
        },
        {
            userHandle: 'user',
            screamId: '3IOnFoQexRcofs5OhBXO'
        }
    ]
};

const allScreamIds = {
    a: 'RcBUUkOx0QuFWQ3uobbm',
    b: 'YlQdC8O3vfJHvwaReqMk',
    c: 'qXzrbE25CDOPVQOPLK8w',
    d: 'qbK1gg2YB6qyspBhsrHT',
    e: 'su8AxMGP4JjIbBGB65Ix',
    f: 'tlK3kHCsDIR905MMtSbp',
    g: 'wVhilWmeG00BVEIOd96U'
};
  
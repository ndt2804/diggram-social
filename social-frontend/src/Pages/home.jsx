import PostCard from "../components/ui/Card"
const posts = [
    {
        id: '1',
        creator: {
            id: '1',
            name: 'John Doe',
            imageUrl: './assets/icons/camera.svg'

        },
        caption: 'First post caption',
        location: 'New York',
        tags: ['tag1', 'tag2'],
        imageUrl: './assets/icons/camera.svg',
        createdAt: '2024-09-01T12:00:00Z'
    },
    {
        id: '2',
        creator: {
            id: '2',
            name: 'Jane Smith',
            imageUrl: './assets/icons/camera.svg',
        },
        caption: 'Second post caption',
        location: 'Los Angeles',
        tags: ['tag3', 'tag4'],
        imageUrl: './assets/icons/camera.svg',
        createdAt: '2024-09-02T12:00:00Z'
    },
    {
        id: '3',
        creator: {
            id: '3',
            name: 'Alice Johnson',
            imageUrl: './assets/icons/camera.svg',
        },
        caption: 'Third post caption',
        location: 'Chicago',
        tags: ['tag5', 'tag6'],
        imageUrl: './assets/icons/camera.svg',
        createdAt: '2024-09-03T12:00:00Z'
    },
    {
        id: '4',
        creator: {
            id: '4',
            name: 'Bob Brown',
            imageUrl: './assets/icons/camera.svg',
        },
        caption: 'Fourth post caption',
        location: 'San Francisco',
        tags: ['tag7', 'tag8'],
        imageUrl: './assets/icons/camera.svg',
        createdAt: '2024-09-04T12:00:00Z'
    },
    {
        id: '5',
        creator: {
            id: '5',
            name: 'Charlie Davis',
            imageUrl: './assets/icons/camera.svg',
        },
        caption: 'Fifth post caption',
        location: 'Seattle',
        tags: ['tag9', 'tag10'],
        imageUrl: './assets/icons/camera.svg',
        createdAt: '2024-09-05T12:00:00Z'
    }
];
const Home = () => {
    return (
        <div className='flex flex-1'>
            <div className='home-container'>
                <div className='home-posts'>
                    <h2 className='h3-bold md:h2-bold text-left w-full'>Home feed</h2>

                    <ul className='flex flex-col flex-1 gap-9 w-full'>
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Home
import React, {useState, useMemo} from 'react';
import '../src/styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

function App() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'IPhone 7',
            description: 'The iPhone 7 mobile was launched in September 2016. The phone comes with a 4.70-inch touchscreen display with a resolution of 750x1334 pixels at a pixel density of 326 pixels per inch (ppi) and an aspect ratio of 16:9. Apple iPhone 7 is powered by a 2.34GHz quad-core Apple A10 Fusion processor.'
        },
        {
            id: 2,
            title: 'IPhone 11',
            description: 'The iPhone 11 has a 6.1 in (15.5 cm) IPS LCD, unlike the Pro models which have OLED displays. The resolution is 1792 × 828 pixels (1.5 megapixels at 326 ppi) with a maximum brightness of 625 nits and a 1400:1 contrast ratio. It supports Dolby Vision, HDR10, True-Tone, and a wide color gamut.'
        },
        {
            id: 3,
            title: 'IPhone 8',
            description: 'The iPhone 8 features a 4.7-inch display with a resolution of 1334 by 750 with 326 pixels per inch and a 1400:1 contrast ratio, while the iPhone 8 Plus features a 5.5-inch display with a 1920 by 1080 resolution, 401 pixels per inch, and a 1300:1 contrast ratio.'
        }
    ])
    const [selectedSort, setSelectedSort] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const sortedPosts = useMemo(() => {
        console.log('occurred change state')
        if(selectedSort) {
            return [...posts].sort((a,b) => a[selectedSort].localeCompare(b[selectedSort]))
        }
        return posts;
    }, [selectedSort, posts] )

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter((post) => post.title.toLowerCase().includes(searchQuery))
    },[searchQuery, sortedPosts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
const sortPosts = (sort) => {
    setSelectedSort(sort)
}
    return (
        <div className="App">
            <PostForm
                create={createPost}/>
            <div>
                <MyInput
                    placeholder="Search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue='Sort'
                    options={[
                    {value: 'title', name: 'by the name'},
                    {value: 'description', name: 'by the description'}
                ]} />
            </div>
            {posts.length !== 0
                ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Phones List'/>
                : <div className='entries'>No entries...</div>
            }
        </div>
    );
}

export default App;

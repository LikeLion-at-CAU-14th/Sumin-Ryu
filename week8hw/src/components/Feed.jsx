import React from 'react'
import styled from 'styled-components'

const posts = [
  { id: 1, img: '/assets/me.jpg', label: 'me' },
  { id: 2, img: '/assets/acmilan.jpg', label: 'acmilan' },
  { id: 3, img: '/assets/travel.jpg', label: 'travel' },
]

const Feed = () => {
  return (
    <FeedContainer>
      {posts.map((post) => (
        <Post key={post.id}>
          <ImgBox style={{ backgroundImage: `url(${post.img})` }} />
          <TextBox>{post.label}</TextBox>
        </Post>
      ))}
    </FeedContainer>
  )
}

export default Feed

const FeedContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

const Post = styled.div`
  flex: 1;
  border: 2px solid black;
`

const ImgBox = styled.div`
  height: 250px;
  background-size: cover;
  background-position: center;
`

const TextBox = styled.div`
  background: white;
  text-align: center;
  padding: 10px;
  font-weight: bold;
`

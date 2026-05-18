import React from 'react'
import styled from 'styled-components'

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfileImg>
        <img src="/assets/내사진.jpg" alt="프로필 이미지" />
      </ProfileImg>
      <ProfileInfo>
        <div>
          <strong>3</strong>
          <br />
          게시물
        </div>
        <div>
          <strong>0</strong>
          <br />
          팔로워
        </div>
        <Following href="https://cau-likelion.org/" target="_blank">
          <div>
            <strong>1</strong>
            <br />
            팔로잉
          </div>
        </Following>
      </ProfileInfo>
    </ProfileContainer>
  )
}

export default Profile

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid gray;
  padding: 20px;
  margin-bottom: 30px;
`

const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid green;

  img {
    width: 100%;
    height: 100%;
  }
`

const ProfileInfo = styled.div`
  display: flex;
  gap: 40px;
  text-align: center;
`

const Following = styled.a`
  text-decoration: none;
  color: black;
`

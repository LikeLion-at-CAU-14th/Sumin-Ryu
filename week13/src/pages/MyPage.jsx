import React from 'react'
import { useUserInfo } from '../context/UserInfoContext'

const MyPage = () => {
  
  const userInfo = useUserInfo();

  return (
    <div>
      <h2>내 정보</h2>
      <p>이름: {userInfo.name}</p>
      <p>이메일: {userInfo.email}</p>
      <p>생년월일: {userInfo.birth}</p>
      <p>성별: {userInfo.gender}</p>
    </div>
  )
}

export default MyPage
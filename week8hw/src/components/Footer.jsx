import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterContainer>
      <a href="mailto:cocos10200@naver.com" className="button">
        <img src="/assets/email.jpg" alt="email" />
      </a>
      <a href="https://github.com/susuu-m6" target="_blank" className="button">
        <img src="/assets/github.jpg" alt="github" />
      </a>
      <a href="https://velog.io/@sumin1020/posts" target="_blank" className="button">
        <img src="/assets/velog.png" alt="velog" />
      </a>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  gap: 50px;

  .button img {
    width: 30px;
    height: 30px;
  }
`

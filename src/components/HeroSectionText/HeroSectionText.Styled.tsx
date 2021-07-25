import styled from 'styled-components'

const HeroSectionTextStyled = styled.div`
  z-index: 1;
  width: 780px;
  padding: 120px 0;
  color: #FFF;
  display: flex;
  align-items: center;
  flex-direction: column;
  
  
  h1 {
    font-size: 56px;
    margin: 0 0 30px 0;
  }
  .hero-section-text {
    font-size: 20px;
    text-align: center;
    line-height: 32px;
  }
  button {
    height: 56px;
    width: 315px;
    outline: none;
    border: none;
    background: transparent;
    background-color: #23272a;
    border-radius: 28px;
    font-size: 20px;
    color: #fff;
    box-shadow: 0 8px 15px rgb(0 0 0 / 20%);
    cursor: pointer;
    margin-top: 24px;
  }
  button:hover {
    background-color: #36393f;
  }

  @media only screen and (max-width: 800px) {
    width: auto;
    margin: 20px;

    .hero-section-text {
      text-align: left;
    }
    h1 {
      font-size: 48px;
    }
  }
  
  
  
  
`

export default HeroSectionTextStyled
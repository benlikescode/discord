import styled from 'styled-components'

const LandingPageStyled = styled.div`
  .wave-path-wrapper {
    color: #f6f6f6;
  }

  .wave-path-inverted-wrapper {
    color: #f6f6f6;
    transform: matrix(1,0,0,-1,0,0);
  }

  .wave-section-bg {
    background-color: #f6f6f6;

    .section-content-wrapper {
      margin-right: 120px;
      margin-left: 0;
    }
  }

  .home-page-section {
    height: 680px;
    display: flex;
    width: var(--home-page-width);
    align-items: center;
  }

  .last-home-section {
    display: flex;
    width: var(--home-page-width);
    align-items: center;
    flex-direction: column;
    margin: 120px 0 80px 0;

    .section-content-wrapper {
      margin: 0;
      max-width: 980px;
      text-align: center;
    }

    img {
      width: 100%;
    }
  }
  
  .center-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .section-content-wrapper {
    color: #23272a;
    max-width: 380px;
    margin-left: 120px;

    h2 {
      font-size: 48px;
      margin: 0 0 20px 0;
    }

    .section-text {
      font-size: 20px;
      line-height: 32px;
    }
  }

  .bottom-section {
    height: 164px;
    display: flex;
    width: var(--home-page-width);
    align-items: center;
    flex-direction: column;
    margin-bottom: 120px;

    button {
      height: 56px;
      width: 315px;
      outline: none;
      border: none;
      background: transparent;
      background-color: #7289da;
      border-radius: 28px;
      font-size: 20px;
      color: #fff;
      box-shadow: 0 8px 15px rgb(0 0 0 / 20%);
      cursor: pointer;
      margin-top: 40px;
    }

    button:hover {
      background-color: #8ea1e1;
    }

    h4 {
      margin: 0;
      font-size: 30px;
      margin-top: -20px;
    }
  }

  @media only screen and (max-width: 1300px) {
    --home-page-width: 85vw;
    .hero-section-text {
      text-align: left;
    }

    .home-page-section img {
      width: 60%;
    }

    .section-content-wrapper {
      max-width: 90%;
      margin: 0;
    }

    .wave-section-bg .section-content-wrapper {
      margin: 0;
    }
  }

  @media only screen and (max-width: 900px) {
    .home-page-section {
      flex-direction: column;
      gap: 30px;
      height: auto;
      justify-content: center;
      align-items: center;
      margin: 50px 0;
    }
    
    .home-page-section img {
      width: 100%;
    }
    
    .section-content-wrapper {
      margin: 0;
      max-width: 90vw;
      
      h2 {
        font-size: 40px;
      }
    }

    .wave-section-bg {
      .section-content-wrapper {
        margin: 0;
      }
      
      .home-page-section {
        flex-direction: column-reverse;
        height: auto;
        justify-content: center;
        align-items: center;
      }
    }
  }
`

export default LandingPageStyled
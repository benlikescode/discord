import styled from 'styled-components'

const HeroSectionStyled = styled.div`
  height: 625px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  
  .hero-section-image {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  } 
`

export default HeroSectionStyled
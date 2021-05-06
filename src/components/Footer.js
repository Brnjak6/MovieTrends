import React from 'react'
import styled from 'styled-components'

function Footer() {
    return (
        <Container>
            <div>
                <h4>Created by <span>OPTIC</span>. Any queries? Contact me on Discord OPTIC#9494 or on GitHub</h4>
                <Description><span>GitHub:</span> https://github.com/Brnjak6 </Description>
            </div>
        </Container>
    )
}

const Container = styled.section`
display: flex;
justify-content: center;
align-items: center;
text-align: center;
width: 100%;
height: 10vh;
background: ${props => props.theme.colors.footer};
box-shadow: 0px 4px 10px 4px ${props => props.theme.colors.secondary};
margin-top: 8rem;
font-size: 1.2rem;
& span {
    color: ${props => props.theme.colors.secondary};
}

@media only screen and (max-width: 930px) {
    h4 {
        font-size: 1.1rem;
        font-weight: lighter;
        margin-bottom: .3rem;
        padding: 0 .3rem;
    }
}
@media only screen and (max-width: 400px) {
    h4 {
        font-size: 1rem;
    }
 }

 @media only screen and (max-width: 700px) {
    height: 13vh;
 }
`

const Description = styled.h5`
font-weight: lighter;

@media only screen and (max-width: 930px) {
   font-size: .9rem;
 }
`

export default Footer

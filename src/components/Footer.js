import React from 'react'
import styled from 'styled-components'

function Footer() {
    return (
        <Container>
            <div>
                <h4>Created by OPTIC. Any queries? Contact me on Discord OPTIC#9494.</h4>
                <Description>GitHub: https://github.com/Brnjak6 </Description>
            </div>
        </Container>
    )
}

const Container = styled.section`
display: flex;
justify-content: center;
align-items: center;
text-align: center;
height: 10vh;
background: ${props => props.theme.colors.footer};
box-shadow: 0px 4px 10px 4px ${props => props.theme.colors.secondary};
margin-top: 8rem;
font-size: 1.2rem;
`

const Description = styled.h5`
font-weight: lighter;
`

export default Footer

import React from 'react';
import styled from 'styled-components'

function StatusMessage({ status }) {
    return (
        <Overlay>
            <Box>
                <Message>{status}</Message>
            </Box>
        </Overlay>
    )
}

const Overlay = styled.div`
width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 3;
`

const Box = styled.div`
 position: relative;
  width: fit-content;
  height: fit-content;
`
const Message = styled.h2`
  background: #000;
  color: ${props => props.theme.colors.secondary};
    padding: 1.3rem 2rem;
    border-radius: 15%;
`
export default StatusMessage

import styled from "styled-components";

export const Button = () => {
    return (<StyledButton></StyledButton>);
}

export const Container = () => {
    return (<StyledContainer></StyledContainer>);
}

export const FloatingButton = () => {
    return (<StyledFloatingButton></StyledFloatingButton>);
}


const StyledContainer = styled('div')`
    position: absolute;
    bottom: 20px;
    right: 20px;
    padding: 20px;
    height: 100px;
    border-radius: 20px;
    width: 200px;
    background-color: #000;
    opacity: .4;
    backdrop-filter: blur(5px);
`

const StyledFloatingButton = styled('div')`
    position: absolute;
    bottom: 20px;
    left: 20px;
    padding: 20px;
    height: 20px;
    border-radius: 50px;
    width: 20px;
    background-color: #000;
    opacity: .4;
    backdrop-filter: blur(5px);
`

const StyledButton = styled('div')`
    position: absolute;
    bottom: 20px;
    left: 50%;
    padding: 20px;
    height: 20px;
    border-radius: 50px;
    width: 100px;
    background-color: #000;
    opacity: .4;
    backdrop-filter: blur(5px);
`
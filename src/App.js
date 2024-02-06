import styled from 'styled-components';
import './App.css';
import { Scene } from './components/canvas/scene.js';
import { theme } from './components/theme/theme.js';
import { Suspense } from 'react';
import { Loader } from '@react-three/drei';
import { Button, Container, FloatingButton } from './components/overlay/ui.js';


function App() {

	return (
		<AppContainer className="App">
			<Scene />
			<Container />
			<FloatingButton />
			<Button />
		</AppContainer>
	);
}

export default App;

const AppContainer = styled('div')`
	height: 100vh;
	width: 100vw;
	position: relative;
	background-color: ${theme.colors.background}
`

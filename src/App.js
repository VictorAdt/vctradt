import styled from 'styled-components';
import './App.css';
import { Scene } from './components/canvas/scene.js';
import { theme } from './components/theme/theme.js';
import { isMobile } from 'react-device-detect';
import { Cursor } from './components/overlay/cursor.js';
import Head from './components/head/head.js';


function App() {
	let windowHeight = isMobile ? `${window.innerHeight}px` : '100vh'
	return (
		<AppContainer
			className="App"
			height={windowHeight}
		>
			<Head />
			<Scene />
			<Cursor />
		</AppContainer>
	);
}

export default App;

const AppContainer = styled('div')`
	height: ${props => props.height};
	min-height: 600px;
	width: 100vw;
	position: relative;
	background-color: ${theme.colors.background}
`

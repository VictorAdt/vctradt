import styled from 'styled-components';
import './App.css';
import { Scene } from './components/canvas/scene.js';
import { theme } from './components/theme/theme.js';
import { Controls } from './components/overlay/ui.js';
import { Social } from './components/overlay/social.js';


function App() {

	return (
		<AppContainer className="App">
			<Scene />
			<Social />
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

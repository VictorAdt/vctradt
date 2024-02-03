import styled from 'styled-components';
import './App.css';
import { Scene } from './components/canvas/scene.js';


function App() {

	return (
		<AppContainer className="App">
			<Scene />
		</AppContainer>
	);
}

export default App;

const AppContainer = styled('div')`
	height: 100vh;
	width: 100vw;
`

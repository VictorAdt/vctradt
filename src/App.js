import styled from 'styled-components';
import './App.css';
import { Scene } from './components/canvas/scene.js';
import { theme } from './components/theme/theme.js';
import AnimatedCursor from 'react-animated-cursor';


function App() {
	const windowHeight = window.innerHeight
	return (
		<AppContainer className="App" height={windowHeight}>
			<Scene />
			<AnimatedCursor
				innerStyle={{
					zIndex: 99,
				}}
				innerSize={8}
				outerSize={8}
				color='255, 255, 0'
				outerAlpha={.3}
				innerScale={0.9}
				outerScale={6}
				clickables={[
					'a',
					'input[type="text"]',
					'input[type="email"]',
					'input[type="number"]',
					'input[type="submit"]',
					'input[type="image"]',
					'label[for]',
					'select',
					'textarea',
					'button',
					'.link',
					{
						target: '.custom',
						options: {
							innerSize: 12,
							outerSize: 12,
							color: '255, 255, 10',
							outerAlpha: 0.3,
							innerScale: 0.7,
							outerScale: 5
						}
					}
				]}
			/>
		</AppContainer>
	);
}

export default App;

const AppContainer = styled('div')`
	height: ${props => props.height}px;
	width: 100vw;
	position: relative;
	background-color: ${theme.colors.background}
`

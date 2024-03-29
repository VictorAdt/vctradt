import AnimatedCursor from "react-animated-cursor";
import { isMobile } from "react-device-detect";

export const Cursor = () => {
    return (!isMobile &&
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
        />);
}

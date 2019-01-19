import theme from "./theme";
import {css} from "react-emotion";

export const popupStyle = css`
	font-family: ${theme.typography.fontFamily};
	
	color: black;
	
	h3 {
		color: ${theme.colors.secondaryColor};
	}
`;

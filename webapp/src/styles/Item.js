import styled, {css} from "react-emotion";
import {queries} from "./mediaQueries";

export const ItemContainer = styled.div`
	padding: 20px 0;
	margin: 15px;
	padding: 25px;
	border: 1px solid #eee;
	flex-basis: 400px;
	max-width: 400px;
	min-height: 300px;
	box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	transition: all 0.3s cubic-bezier(.25,.8,.25,1);
	font-size: 14px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	${queries.xxLarge`
		flex-basis: 350px;
		max-width: 350px;
	`};

	&:hover {
		box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	}
`;


export const itemHeaderStyle = css`
	${queries.xxLarge`
		flex-direction: column;

		div {
			justify-content: center;
			margin-top: 5px;
		}
	`};
`;

export const MailContainer = styled.div`
	margin-left: 10px;
`;
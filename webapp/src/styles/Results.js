import {queries} from "./mediaQueries";
import styled, {css} from "react-emotion";

export const selectedFiltersContainer = css`
	margin-left: 10px;
`;

export const ResultListContainer = styled.div`
	margin-top: 60px;

	${queries.xLarge`
		margin-top: 170px;
	`};
	${queries.medium`
		margin-top: 220px;
	`};

	.result-list-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.result-list-pagination {
		margin: 40px 0 50px;
	}

	.result-list-info {
		margin: 1rem;
		justify-content: space-between;
	}

	.powered-by {
		margin: 0 20px 20px 0;
	}
`;

export const NoResultFoundContainer = styled.div`
	margin-left: 10px;
`;
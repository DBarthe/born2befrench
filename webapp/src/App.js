import React, { Component } from 'react';
import { ReactiveBase, DataSearch } from '@appbaseio/reactivesearch';

import theme from './styles/theme';

import Header from './components/Header';
import Results from './components/Results';

import Container, { resultsContainer, dataSearchContainer, appContainer } from './styles/Container';
import Flex, { FlexChild } from './styles/Flex';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container>
				<ReactiveBase
					app="nat"
					url="http://localhost:9200"
					theme={theme}
				>
					<Flex direction="row-reverse" className={appContainer}>
						<Header />
						<FlexChild className={resultsContainer}>
							<DataSearch
								componentId="search"
								dataField={['original.*']}
                                placeholder="Rechercher"
								iconPosition="left"
								autosuggest={false}
								URLParams
								className={dataSearchContainer}
								innerClass={{
									input: 'search-input',
								}}
                                debounce={300}
                                fuzziness={2}
							/>
							<Results />
						</FlexChild>
					</Flex>
				</ReactiveBase>
			</Container>
		);
	}
}

export default App;

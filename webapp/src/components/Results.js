import React from 'react';
import {ReactiveList} from '@appbaseio/reactivesearch';
import Flex from '../styles/Flex';
import {SelectedFilters} from "@appbaseio/reactivesearch/lib/index";
import NoResultFound from "./NoResultFound";
import Expo from "./Expo";
import Item from "./Item";
import {ResultListContainer, selectedFiltersContainer} from "../styles/Results";
import SearchFilters from "./SearchFilters";

class Results extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			imageShow: false,
			imageList: [],
			imageAlt: ""
		};

		this.showImagesHandler = this.showImagesHandler.bind(this);
		this.onData = this.onData.bind(this);
	}

	showImagesHandler(data) {
		this.setState({
			imageShow: true,
			imageList: data.images,
			imageAlt: `decret numérisé ${data.cote} / ${data.decret_cote}`
		})
	}

    onData(data) {
        return <Item key={data._id} data={data} showImagesHandler={this.showImagesHandler}/>
    }

    static onResultStats = (results, time) => (
        <Flex justifyContent="flex-end">
            {results} résultats trouvés en {time}ms
        </Flex>
    );

	static onNoResultFound = () => (
	    <NoResultFound/>
    );

	render() {

		return (
            <ResultListContainer>
                <SelectedFilters className={selectedFiltersContainer}/>
                <Expo
                    visible={this.state.imageShow}
                    handlerClose={() => this.setState({ imageShow: false, imageList: [], imageAlt: ""})}
                    images={this.state.imageList}
					alt={this.state.imageAlt}
                />
                <ReactiveList
                    componentId="results"
                    dataField="_id"
                    onData={this.onData}
                    onResultStats={this.onResultStats}
                    react={{
                        and: SearchFilters.ALL_COMPONENTS
                    }}
                    pagination
                    innerClass={{
                        list: 'result-list-container',
                        pagination: 'result-list-pagination',
                        resultsInfo: 'result-list-info',
                        poweredBy: 'powered-by',
                    }}
                    onNoResults={this.onNoResultFound}
                    size={12}
                    URLParams
                    sortOptions={[
                        {
                            label: 'Meilleur résultat',
                            dataField: '_score',
                            sortBy: 'desc',
                        },
                        {
                            label: 'Cote A-Z',
                            dataField: 'cote.keyword',
                            sortBy: 'asc',
                        },
                        {
                            label: 'Nom A-Z',
                            dataField: 'nom.keyword',
                            sortBy: 'asc',
                        },
                        {
                            label: 'Prénom A-Z',
                            dataField: 'prenoms.keyword',
                            sortBy: 'asc',
                        },
                        {
                            label: 'Date de naissance',
                            dataField: 'date_naissance',
                            sortBy: 'asc',
                        },
                        {
                            label: 'Date du décret',
                            dataField: 'date',
                            sortBy: 'asc',
                        },
                    ]}
                />
            </ResultListContainer>
		);
	}
}

export default Results;

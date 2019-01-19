import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	MultiDropdownList,
	RangeSlider,
} from '@appbaseio/reactivesearch';

import Flex, { FlexChild } from '../styles/Flex';
import { MultiList } from "@appbaseio/reactivesearch/lib/index";
import {filtersContainer, searchFilterList} from "../styles/SearchFilters";

class SearchFilters extends Component {

    static ALL_COMPONENTS = ["document_date", "search", "pays_naissance", "profession", "lieu_residence", 'status_familial'];

    static allComponentsBut(component) {
        return SearchFilters.ALL_COMPONENTS.filter(c => c !== component)
    }

    render() {
        let { visible } = this.props;

        return (

            <Flex direction="column" hidden={!visible} className={filtersContainer}>

                <FlexChild margin="20px">
                    <RangeSlider
                        componentId="document_date"
                        dataField="date"
                        title="Date du décret"
                        range={{
                            start: new Date('10/1/1886').getTime(),
                            end: new Date('1/1/1891').getTime()
                        }}
                        rangeLabels={{
                            start: "1887",
                            end: "1891"
                        }}
                        interval={30*24*60*60*1000}
                        react={{
                            and: SearchFilters.allComponentsBut("document_date")
                        }}
                        URLParams

                    />
                </FlexChild>

                <FlexChild margin="10px">
                    <MultiList
                        componentId="pays_naissance"
                        dataField="pays_naissance.keyword"
                        title="Pays de naissance"
                        placeholder="Selectionner un pays"
                        size={100}
                        URLParams
                        react={{ and: SearchFilters.allComponentsBut("pays_naissance") }}
                        queryFormat='or'
                        showSearch={true}
                        showMissing={true}
                        missingLabel={"Inconnu"}
                        innerClass={{
                            list: searchFilterList,
                        }}
                    />
                </FlexChild>
                <FlexChild margin="10px">
                    <MultiDropdownList
                        componentId="profession"
                        dataField="profession.keyword"
                        title="Profession"
                        placeholder="Selectionner une profession"
                        size={100}
                        URLParams
                        react={{ and: SearchFilters.allComponentsBut("profession") }}
                        queryFormat='or'
                        showSearch={true}
                        showMissing={true}
                        missingLabel={"Inconnue"}
                        innerClass={{
                            list: searchFilterList,
                        }}
                    />
                </FlexChild>

                <FlexChild margin="10px">
                    <MultiDropdownList
                        componentId="lieu_residence"
                        dataField="lieu_residence.keyword"
                        title="Lieu de résidence"
                        placeholder="Selectionner un lieu"
                        size={100}
                        URLParams
                        react={{ and: SearchFilters.allComponentsBut("lieu_residence") }}
                        queryFormat='or'
                        showSearch={true}
                        showMissing={true}
                        missingLabel={"Inconnu"}
                        innerClass={{
                            list: searchFilterList,
                        }}
                    />
                </FlexChild>


                <FlexChild margin="10px">
                    <MultiList
                        componentId="status_familial"
                        dataField="status_familial"
                        title="Status familial"
                        placeholder="Selectionner un status familial"
                        size={100}
                        URLParams
                        react={{ and: SearchFilters.allComponentsBut("status_familial") }}
                        queryFormat='or'
                        showSearch={false}
                        showMissing={true}
                        missingLabel={"Inconnu"}
                        innerClass={{
                            list: searchFilterList,
                        }}
                    />
                </FlexChild>
            </Flex>

        )
    }
}

SearchFilters.propTypes = {
	visible: PropTypes.bool,
};

export default SearchFilters;

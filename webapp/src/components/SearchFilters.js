import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Include the locale utils designed for moment

import MomentLocaleUtils from 'react-day-picker/moment';

import {
	MultiDropdownList,
	SingleDropdownRange,
	RangeSlider,
} from '@appbaseio/reactivesearch';

import Flex, { FlexChild } from '../styles/Flex';
import {filterListContainer, filtersContainer, searchFilterList} from '../styles/Container';
import {
    DateRange,
    DynamicRangeSlider, MultiList, SelectedFilters, SingleDropdownList,
    SingleList
} from "@appbaseio/reactivesearch/lib/index";

const SearchFilterTitle = ({ title, value, handler }) => (
    <div>
        <input type="checkbox"
               value={value}
               onChange={handler}
        />{title}
    </div>
);

class SearchFilterToogle extends Component {
    render() {
        if (this.props.toogle) {
            return <MultiDropdownList componentId={this.props.id} {...this.props}/>
        }
        else {
            return <MultiList componentId={this.props.id + "_ext"} {...this.props}/>
        }
    }
}

class SearchFilters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxes: {
                paysNaissance: false
            }
        }

        this.handleCheckboxPaysNaissance = this.handleCheckboxPaysNaissance.bind(this);
    }

    handleCheckboxPaysNaissance(event) {
        console.log("handleCheckboxPaysNaissance", event.target.value)
        this.setState({
            checkboxes: {
                paysNaissance: event.target.checked
            }
        })
    }

    render() {
        let { currentTopics, setTopics, visible } = this.props;

        return (

            <Flex direction="column" hidden={!visible} className={filtersContainer}>
                {/*<FlexChild margin="10px">*/}
                {/*<MultiDropdownList*/}
                {/*componentId="language"*/}
                {/*dataField="language.raw"*/}
                {/*title="Language"*/}
                {/*placeholder="Select languages"*/}
                {/*URLParams*/}
                {/*react={{ and: ['topics', 'pushed', 'created', 'forks', 'stars'] }}*/}
                {/*/>*/}
                {/*</FlexChild>*/}

                <FlexChild margin="20px">
                    <RangeSlider
                        componentId="document_date"
                        dataField="date"
                        title="Date du décret"
                        range={{
                            start: new Date('10/1/1886').getTime(),
                            end: new Date('1/1/1891').getTime()
                        }}
                        // rangeLabels={(min, max) => (
                        //     {
                        //         "start": new Date(min).getFullYear(),
                        //         "end": new Date(max).getFullYear()
                        //     }
                        // )}
                        rangeLabels={{
                            start: "1887",
                            end: "1891"
                        }}
                        interval={30*24*60*60*1000}
                        react={{
                            and: ["search", "pays_naissance", "profession", "lieu_residence", 'status_familial' ]
                        }}
                        URLParams

                    />
                </FlexChild>

                {/*<FlexChild margin="10px">*/}
                    {/*<DateRange*/}
                        {/*componentId="naissance_date"*/}
                        {/*dataField="date_naissance"*/}
                        {/*title="Date de naissance"*/}
                        {/*//interval={30*24*60*60*1000}*/}
                        {/*URLParams*/}
                        {/*numberOfMonths={1}*/}
                        {/*focused={false}*/}
                        {/*dayPickerInputProps={{*/}
                            {/*dayPickerProps: {*/}
                                {/*locale: 'fr',*/}
                                {/*localeUtils: MomentLocaleUtils*/}
                            {/*}*/}
                        {/*}}*/}
                        {/*initialMonth={new Date('1850-1-1')}*/}
                    {/*/>*/}
                {/*</FlexChild>*/}


                <FlexChild margin="10px">
                    <MultiList
                        componentId="pays_naissance"
                        dataField="pays_naissance.keyword"
                        title="Pays de naissance"
                        placeholder="Selectionner un pays"
                        size={100}
                        //selectAllLabel={"Tous"}
                        URLParams
                        //defaultSelected={currentTopics}
                        //onValueChange={setTopics}
                        react={{ and: ['search', 'profession', "document_date", "lieu_residence", 'status_familial' ] }}
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
                        //selectAllLabel={"Tous"}
                        URLParams
                        //defaultSelected={currentTopics}
                        //onValueChange={setTopics}
                        react={{ and: ['search', 'pays_naissance', "document_date", "lieu_residence", 'status_familial' ] }}
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
                        //selectAllLabel={"Tous"}
                        URLParams
                        //defaultSelected={currentTopics}
                        //onValueChange={setTopics}
                        react={{ and: ['search', 'pays_naissance', "document_date", "profession", 'status_familial'] }}
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
                        //selectAllLabel={"Tous"}
                        URLParams
                        //defaultSelected={currentTopics}
                        //onValueChange={setTopics}
                        react={{ and: ['search', 'pays_naissance', "document_date", "profession", 'lieu_residence'] }}
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
	currentTopics: PropTypes.arrayOf(PropTypes.string),
	setTopics: PropTypes.func,
	visible: PropTypes.bool,
};

export default SearchFilters;

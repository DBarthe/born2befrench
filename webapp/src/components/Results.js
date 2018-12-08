import React from 'react';
import { ReactiveList } from '@appbaseio/reactivesearch';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react'

import ResultItem, {
    resultListContainer, resultCardHeader, selectedFiltersContainer,
    resultPopup
} from '../styles/ResultItem';
import Flex, { FlexChild } from '../styles/Flex';
import Link from '../styles/Link';
import Button from '../styles/Button';
import {SelectedFilters} from "@appbaseio/reactivesearch/lib/index";
import Topic from "../styles/Topic";
import theme from "../styles/theme";
import {linkButton, ResearchHelpContainer} from "../styles/Container";

const onResultStats = (results, time) => (
	<Flex justifyContent="flex-end">
		{results} résultats trouvés en {time}ms
	</Flex>
);

const ResearchHelp = (props) => (
	<ResearchHelpContainer>
		<p>Aucun résulat ne correspond à cette recherche</p>

		<p>Pourquoi ne trouvez-vous pas le décret de naturalisation recherché ?</p>

		<ol>
			<li>
				<b>Le décret n'a pas encore été numérisé ou indexé dans notre base de données.</b>
                <br/>
				Nous vous invitons à rechercher votre décret dans:
				<ul>
					<li>
                        liste alphabétique des personnes ayant acquis ou perdu la nationalité française par décret,
					</li>
					<li>
                        le bulletin officiel,
					</li>
					<li>
                        le supplément au bulletin officiel.
					</li>
				</ul>
				Ces documents sont consultables en salle de lecture
				<ul>

					<li>
                        aux <a target="_blank" href="https://francearchives.fr/fr/annuaire/departements">Archives Départementales</a>,
					</li>
					<li>
						aux <a target="_blank" href="http://www.archivesnationales.culture.gouv.fr/">Archives Nationales</a>,
					</li>
					<li>
                        à la <a target="_blank" href="http://www.bnf.fr/fr/acc/x.accueil.html">Bibliothèque Nationale de France</a>.
					</li>
				</ul>
			</li>

            <br/>

            <li>
				<b>La naturalisation a été faite par jugement au tribunal de paix.</b>
				<ul>
                    <li>
                        La demande a été effectuée en France ou dans les colonies (hors Algérie) : contacter le service d'archives départementales correspondant au tribunal de paix.
					</li>
                    <li>
						La demande a été effectuée en Algérie : contacter le Ministère de la Justice, service de la documentation, <a target="_blank" href="https://www.google.com/maps/place/Minist%C3%A8re+de+la+justice/@36.7689204,3.0369002,21z/data=!4m12!1m6!3m5!1s0x128fb23f4296569b:0xbf2ac1b65f3f2738!2s8+place+Bir+Hakem,+El-Biar,+Alger!8m2!3d36.768967!4d3.0368784!3m4!1s0x0:0xad7ee290dbff6c18!8m2!3d36.7689017!4d3.0368239">8 place Bir Hakem, El-Biar, Alger, Algérie.</a>
					</li>
                </ul>
            </li>

            <br/>

            <li>
				<b>Le décret n'existe pas : certaines demandes n'ont jamais abouties ou n'ont pas lieu d'être.</b>
                <ul>
                    <li>
                        Pour les demandes rejetées, vous pouvez trouver le dossier aux Archives Départementales du département de résidence du demandeur.
					</li>
                    <li>
                        Les Juifs d'Algérie du nord ont été naturalisés par un décret général (décret Crémieu, 1870) : il n'existe donc pas de décret individuel.
                    </li>
                </ul>
            </li>


		</ol>
	</ResearchHelpContainer>
);

const Results = ({ toggleTopic, currentTopics }) => (
	<div className={resultListContainer}>
		<SelectedFilters className={selectedFiltersContainer}/>
    <ReactiveList
		componentId="results"
		dataField="_id"
		onData={data => onData(data, currentTopics, toggleTopic)}
		onResultStats={onResultStats}
		react={{
            and: ['search', 'pays_naissance', 'profession', "document_date", "lieu_residence" , 'status_familial']
		}}
		pagination
		innerClass={{
			list: 'result-list-container',
			pagination: 'result-list-pagination',
			resultsInfo: 'result-list-info',
			poweredBy: 'powered-by',
		}}
        onNoResults={(<ResearchHelp/>)}
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
	</div>
);

const toLiteralDate = (dateString) => {
	if (dateString !== undefined) {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(Date.parse(dateString)).toLocaleDateString("fr-FR", options)
	}
	else {
		return "inconnu"
	}
}

const ResultPopup = ({data}) => (
	<Flex className={resultPopup} direction="column">
		<FlexChild><h3>Transcription originale</h3></FlexChild>
		{/*<FlexChild>{Object.keys(data.original).map((key, i) => <p key={i}>{key}: {data.original[key] || "inconnu"}</p>)*/}
		{/*}</FlexChild>*/}
		{Object.keys(data.original).map((key, i) => <FlexChild key={i}><b>{key}</b>: {data.original[key] || "inconnu"}</FlexChild>)}
	</Flex>
)

const PopupConsultation = ({data}) => (
    <Flex className={resultPopup} direction="column">
        <FlexChild><h3>References</h3></FlexChild>


        <FlexChild><b>Cote du décret</b>: {data.decret_cote}</FlexChild>
        <FlexChild><b>Cote du dossier</b>: {data.cote} (sous-série BB/11)</FlexChild>

        <br/>

		<FlexChild>Les Archives Nationales conservent deux types de documents:
			<ul>
				<li>Un décret officiel actant la naturalisation de l'individu</li>
				<li>Un dossier de naturalisation</li>
			</ul>
		</FlexChild>

		<FlexChild>Le decret est consultable en ligne dans <a href="https://www.siv.archives-nationales.culture.gouv.fr">salle des inventaires virtuelle</a></FlexChild>

		<FlexChild>Pour consulter les dossier, il faut se rendre sur le site de Pierrefitte-sur-Seine</FlexChild>

		<FlexChild><a href="http://www.archives-nationales.culture.gouv.fr/web/guest/dossiers-de-naturalisation">Plus d'information...</a></FlexChild>
	</Flex>
)




const onData = (data, currentTopics, toggleTopic) => (
    <ResultItem key={data._id}>

        <Flex alignCenter justifyContent="center" className={resultCardHeader}>
            <Link href={`https://www.google.fr/search?q=${data.prenoms} ${data.nom}`} target="_blank" rel="noopener noreferrer">
                <Flex flexWrap alignCenter justifyContent="center">
                    <FlexChild alignCenter>{data.prenoms}</FlexChild>&nbsp;<FlexChild alignCenter>{data.nom}</FlexChild>
                </Flex>
            </Link>
        </Flex>

        <Flex alignCenter justifyContent="center">
            <FlexChild alignCenter>né{data.status_familial === "épouse" ? "e" : ""} le {toLiteralDate(data.date_naissance)} ({data.pays_naissance || "inconnu"})</FlexChild>
        </Flex>

        <Flex alignCenter flexWrap justifyContent="center">
            <FlexChild alignCenter>{data.profession || "profession inconnue"}</FlexChild>
        </Flex>

        <Flex alignCenter flexWrap justifyContent="center">
            <FlexChild alignCenter>{ data.lieu_residence ? `résidant à ${data.lieu_residence}` : "lieu de résidence inconnu"}</FlexChild>
        </Flex>

        <Flex alignCenter justifyContent="center">
            <FlexChild alignCenter>naturalisé{data.status_familial === "épouse" ? "e" : ""} le {toLiteralDate(data.date)}</FlexChild>
        </Flex>

		<Flex>
            <FlexChild>
                <Popup  style={{display: "flex !important"}}
                    trigger={
                        <Button><i className="fas fa-file-alt" />Details</Button>
                    }
                    content={<ResultPopup data={data}/>}
                    on={'click'}
					position="right center"
                />
            </FlexChild>

			<FlexChild>
                <Popup  style={{display: "flex !important"}}
                        trigger={
                            <Button><i className="fas fa-book " />References</Button>
                        }
                        content={<PopupConsultation data={data}/>}
                        on={'click'}
                        position="right center"
						wide='very'
                />
			</FlexChild>

            { data.urls ?
				<FlexChild>
					<Button className={linkButton}><a href={data.urls} target="_blank"><i className="fas fa-file-alt" />Consulter</a></Button>
				</FlexChild>
                : ""
            }

        </Flex>


        {/*<Flex alignCenter justifyContent="center" className={resultCardHeader}>*/}
        {/*/!*<Avatar src={data.avatar} alt="User avatar" />*!/*/}
        {/*/!*<Link href={data.url} target="_blank" rel="noopener noreferrer">*!/*/}
        {/*/!*<Flex flexWrap>*!/*/}
        {/*/!*<FlexChild>{data.owner}/</FlexChild>*!/*/}
        {/*/!*<FlexChild>{data.name}</FlexChild>*!/*/}
        {/*/!*</Flex>*!/*/}
        {/*/!*</Link>*!/*/}
        {/*<Link href={data.url} target="_blank" rel="noopener noreferrer">*/}
        {/*<Flex flexWrap>*/}
        {/*<FlexChild>{data.COTE}/</FlexChild>*/}
        {/*<FlexChild>{data.Nom}</FlexChild>*/}
        {/*<FlexChild>{data.Prenoms}</FlexChild>*/}
        {/*<FlexChild>{data.Profession}</FlexChild>*/}
        {/*</Flex>*/}
        {/*</Link>*/}
        {/*</Flex>*/}
        {/*<div style={{ margin: '10px 0' }}>{data.description}</div>*/}
        {/*<Flex flexWrap justifyContent="center">*/}
        {/*{*/}
        {/*data.topics.slice(0, 7)*/}
        {/*.map(item =>*/}
        {/*(*/}
        {/*<Topic*/}
        {/*key={item}*/}
        {/*active={currentTopics.includes(item)}*/}
        {/*toggleTopic={toggleTopic}*/}
        {/*>*/}
        {/*{item}*/}
        {/*</Topic>*/}
        {/*))*/}
        {/*}*/}
        {/*</Flex>*/}
        {/*<Flex>*/}
        {/*<FlexChild><Button><i className="fas fa-star" />{data.stars}</Button></FlexChild>*/}
        {/*<FlexChild><Button><i className="fas fa-code-branch" />{data.forks}</Button></FlexChild>*/}
        {/*<FlexChild><Button><i className="fas fa-eye" />{data.watchers}</Button></FlexChild>*/}
        {/*</Flex>*/}
    </ResultItem>
);

Results.propTypes = {
	toggleTopic: PropTypes.func,
	currentTopics: PropTypes.arrayOf(PropTypes.string),
};

export default Results;

import React from 'react';
import Flex, {FlexChild} from "../styles/Flex";
import {MailDecret, MailDossier} from "./Mails";
import Button from "../styles/Button";
import {Popup} from "semantic-ui-react";
import {popupStyle} from "../styles/Popups";

const DetailsPopup = ({data}) => (
    <Flex className={popupStyle} direction="column">
        <FlexChild><h3>Transcription originale</h3></FlexChild>
        {Object.keys(data.original).map((key, i) => <FlexChild key={i}><b>{key}</b>: {data.original[key] || "inconnu"}</FlexChild>)}
    </Flex>
)

const ReferencesPopup = ({data}) => (
    <Flex className={popupStyle} direction="column">
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

        <FlexChild>
            <Flex direction="row">
                <FlexChild>
                    <Popup  style={{display: "flex !important"}}
                            trigger={
                                <Button><i className="far fa-envelope" />Demander le décret</Button>
                            }
                            content={<MailDecret data={data}/>}
                            on={'click'}
                            position="right center"
                            wide='very'
                    />
                </FlexChild>
                <FlexChild>
                    <Popup  style={{display: "flex !important"}}
                            trigger={
                                <Button><i className="far fa-envelope" />Demander le dossier</Button>
                            }
                            content={<MailDossier data={data}/>}
                            on={'click'}
                            position="right center"
                            wide='very'
                    />
                </FlexChild>
            </Flex>
        </FlexChild>
    </Flex>
)

export {
    DetailsPopup, ReferencesPopup
}

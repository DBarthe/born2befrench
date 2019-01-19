import React from "react";
import {flex, FlexChild} from "../styles/Flex";
import Flex from "../styles/Flex";
import Link from "../styles/Link";
import {Popup} from "semantic-ui-react";
import Button from "../styles/Button";
import {DetailsPopup, ReferencesPopup} from "./Popups";
import {toLiteralDate} from "../utils/date";
import {ItemContainer, itemHeaderStyle} from "../styles/Item";

const Item = ({data, showImagesHandler}) => {
    return <ItemContainer>

        <Flex alignCenter justifyContent="center" className={itemHeaderStyle}>
            <Link href={`https://www.google.fr/search?q=${data.prenoms} ${data.nom}`} target="_blank"
                  rel="noopener noreferrer">
                <Flex flexWrap alignCenter justifyContent="center">
                    <FlexChild alignCenter>{data.prenoms}</FlexChild>&nbsp;<FlexChild alignCenter>{data.nom}</FlexChild>
                </Flex>
            </Link>
        </Flex>

        <Flex alignCenter justifyContent="center">
            <FlexChild
                alignCenter>né{data.status_familial === "épouse" ? "e" : ""} le {toLiteralDate(data.date_naissance)} ({data.pays_naissance || "inconnu"})</FlexChild>
        </Flex>

        <Flex alignCenter flexWrap justifyContent="center">
            <FlexChild alignCenter>{data.profession || "profession inconnue"}</FlexChild>
        </Flex>

        <Flex alignCenter flexWrap justifyContent="center">
            <FlexChild
                alignCenter>{data.lieu_residence ? `résidant à ${data.lieu_residence}` : "lieu de résidence inconnu"}</FlexChild>
        </Flex>

        <Flex alignCenter justifyContent="center">
            <FlexChild
                alignCenter>naturalisé{data.status_familial === "épouse" ? "e" : ""} le {toLiteralDate(data.date)}</FlexChild>
        </Flex>

        <Flex>
            <FlexChild>
                <Popup style={{flex}}
                       trigger={
                           <Button><i className="fas fa-file-alt"/>Details</Button>
                       }
                       content={<DetailsPopup data={data}/>}
                       on={'click'}
                       position="right center"
                />
            </FlexChild>

            {data.images ?
                <FlexChild>
                    <Button onClick={() => {
                        showImagesHandler(data)
                    }}><i className="far fa-images"/>Voir</Button>
                </FlexChild>
                : ""
            }

            <FlexChild>
                <Popup style={{flex}}
                       trigger={
                           <Button><i className="fas fa-book "/>References</Button>
                       }
                       content={<ReferencesPopup data={data}/>}
                       on={'click'}
                       position="right center"
                       wide='very'
                />
            </FlexChild>
        </Flex>
    </ItemContainer>
};

export default Item;
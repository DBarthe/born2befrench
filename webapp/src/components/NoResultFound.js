import React from 'react';
import {NoResultFoundContainer} from "../styles/Results";

const NoResultFound = (props) => (

    <NoResultFoundContainer>
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
                Ces documents sont consultables en salle de lecture.
                <ul>

                    <li>
                        aux <a target="_blank" href="https://francearchives.fr/fr/annuaire/departements">Archives
                        Départementales</a>,
                    </li>
                    <li>
                        aux <a target="_blank" href="http://www.archivesnationales.culture.gouv.fr/">Archives
                        Nationales</a>,
                    </li>
                    <li>
                        à la <a target="_blank" href="http://www.bnf.fr/fr/acc/x.accueil.html">Bibliothèque Nationale de
                        France</a>.
                    </li>
                </ul>
            </li>

            <br/>

            <li>
                <b>La naturalisation a été faite par jugement au tribunal de paix.</b>
                <ul>
                    <li>
                        La demande a été effectuée en France ou dans les colonies (hors Algérie) : contacter le service
                        d'archives départementales correspondant au tribunal de paix.
                    </li>
                    <li>
                        La demande a été effectuée en Algérie : contacter le Ministère de la Justice, service de la
                        documentation, <a target="_blank"
                                          href="https://www.google.com/maps/place/Minist%C3%A8re+de+la+justice/@36.7689204,3.0369002,21z/data=!4m12!1m6!3m5!1s0x128fb23f4296569b:0xbf2ac1b65f3f2738!2s8+place+Bir+Hakem,+El-Biar,+Alger!8m2!3d36.768967!4d3.0368784!3m4!1s0x0:0xad7ee290dbff6c18!8m2!3d36.7689017!4d3.0368239">8
                        place Bir Hakem, El-Biar, Alger, Algérie</a> (<a target="_blank" href="https://www.mjustice.dz">site
                        web</a>).
                    </li>
                </ul>
            </li>

            <br/>

            <li>
                <b>Dans le cas d'une naturalisation par déclaration recognitive (ordonnance du 21 juillet 1962, cas
                    algérien uniquement).</b>
                <ul>
                    <li>
                        Il faut vous contacter la sous-direction de l'accès à la nationalité française, 12 rue Francis
                        Le Carval, 44 404 Rezé, France.

                    </li>

                </ul>
            </li>

            <li>
                <b>Le décret n'existe pas : certaines demandes n'ont jamais abouties ou n'ont pas lieu d'être.</b>
                <ul>
                    <li>
                        Pour les demandes rejetées, vous pouvez trouver le dossier aux Archives Départementales du
                        département de résidence du demandeur.
                    </li>
                    <li>
                        Les Juifs d'Algérie du nord ont été naturalisés par un décret général (décret Crémieu, 1870) :
                        il n'existe donc pas de décret individuel.
                    </li>
                </ul>
            </li>
        </ol>
    </NoResultFoundContainer>
);

export default NoResultFound;
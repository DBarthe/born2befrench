import React from 'react';
import {MailContainer} from "../styles/Item";

class MailTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {

        let { title, description, recipient, object, children } = this.props;

        return (
            <MailContainer>
                <h3>{title}</h3>
                <p>{description}</p>

                <p>À envoyer à { recipient }</p>

                <p><b>Object: {object}</b></p>
                {children}
                <p>
                    [Votre nom] <br/>
                    [Votre adresse email] <br/>
                    [Votre adresse postale] <br/>
                </p>

            </MailContainer>
        )
    }
}

const MailDecret = ({data}) => (
    <MailTemplate
        title={"Formulaire de demande de décret"}
        description="Pour obtenir une reproduction de ce décret de naturalisation, veuillez formuler votre demande en envoyant le mail suivant."
        recipient="exemple@archives-nationales.fr"
        object="Demande de reproduction de décret de naturalisation"
    >
        <p>
            Madame, monsieur,
        </p>

        <p>
            Je souhaiterais obtenir une copie du décret de naturalisation n°{data.decret_cote}.
        </p>

        <p>
            En vous remerciant par avance de l'attention que vous porterez à ma demande.
        </p>

        <p>
            cordialement,
        </p>

    </MailTemplate>
);

const MailDossier = ({data}) => (
    <MailTemplate
        title={"Formulaire de demande de dossier"}
        description="Pour obtenir une reproduction de ce dossier de naturalisation, veuillez formuler votre demande en envoyant le mail suivant."
        recipient="exemple@archives-nationales.fr"
        object="Demande de reproduction de dossier de naturalisation"
    >

        <p>
            Madame, monsieur,
        </p>

        <p>
            Je souhaiterais obtenir une copie du dossier de naturalisation n°{data.cote} de la sous-série BB/11.
        </p>

        <p>
            En vous remerciant par avance de l'attention que vous porterez à ma demande.
        </p>

        <p>
            cordialement,
        </p>

    </MailTemplate>
);

export {
    MailTemplate, MailDecret, MailDossier
}


export const toLiteralDate = (dateString) => {
    if (dateString !== undefined) {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(Date.parse(dateString)).toLocaleDateString("fr-FR", options)
    }
    else {
        return "inconnu"
    }
};

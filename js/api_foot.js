function fetchLastMatch() {
    const leagueId = 'FL1'; // Remplace par l'ID de la compétition (par exemple 'PL' pour Premier League)
    const url = `https://api.football-data.org/v4/competitions/${leagueId}/matches?status=FINISHED`;
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Proxy CORS, à utiliser seulement pour les tests

    fetch(proxyUrl + url, {
        method: 'GET',
        headers: {
            'X-Auth-Token': 'b10dd1a6e38e48f3b5f29cb1f2a9c458' // Utilise ton API key ici
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Données API:', data); // Affiche toute la réponse brute pour mieux comprendre la structure

        // Vérifie si des matchs sont disponibles
        if (data.matches && data.matches.length > 0) {
            // Filtrer les matchs impliquant l'OL
            const olMatches = data.matches.filter(match =>
                match.homeTeam.name === 'Olympique Lyonnais' || match.awayTeam.name === 'Olympique Lyonnais'
            );

            // Vérifie s'il y a des matchs trouvés
            if (olMatches.length > 0) {
                // Trier les matchs par date décroissante (dernier match en premier)
                const lastMatch = olMatches.sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate))[0];
                
                // Afficher le dernier match
                displayLastMatch(lastMatch);
            } else {
                console.log('Aucun match de l\'Olympique Lyonnais trouvé.');
                displayLastMatch(null);  // Aucune donnée pour l'OL
            }
        } else {
            console.log('Aucun match terminé disponible.');
            displayLastMatch(null);  // Pas de matchs dans les résultats
        }
    })
    .catch(error => console.error('Erreur:', error));
}

function displayLastMatch(match) {
const matchResultContainer = document.getElementById('match-result');
matchResultContainer.innerHTML = ''; // Clear previous result

if (match) {
    // Vérifie si les scores sont disponibles, sinon affiche un message de "score à venir"
    const homeScore = (match.score && match.score.fullTime && typeof match.score.fullTime.homeTeam === 'number')
        ? match.score.fullTime.homeTeam
        : 'Score à venir';
    const awayScore = (match.score && match.score.fullTime && typeof match.score.fullTime.awayTeam === 'number')
        ? match.score.fullTime.awayTeam
        : 'Score à venir';

    // Affichage du résultat du dernier match
    matchResultContainer.innerHTML = `
        <strong>${match.homeTeam.name} vs ${match.awayTeam.name}</strong><br>
        Score: ${homeScore} - ${awayScore}<br>
        Date: ${new Date(match.utcDate).toLocaleString()}<br><br>
    `;
} else {
    matchResultContainer.innerHTML = 'Aucun match trouvé pour l\'Olympique Lyonnais.';
}
}




// Appel à la fonction au chargement de la page
window.onload = fetchLastMatch;
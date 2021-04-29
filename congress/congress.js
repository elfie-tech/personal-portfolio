import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'

const congressGrid = document.querySelector('.congressGrid')
const seniorityButton = document.querySelector('#seniorityButton')
const republicansButton = document.querySelector('#republicans')
const missedVotes = document.querySelector('#missedVotes')
const democratButton = document.querySelector('#democrats')
const independentButton = document.querySelector('#independents')

republicansButton.addEventListener('click', () => {
    removeChildren(congressGrid)
    populateCongressDiv(filterCongressPeople(representatives, 'R'))
})

democratButton.addEventListener('click', () => {
    removeChildren(congressGrid)
    populateCongressDiv(filterCongressPeople(representatives, 'D'))
})

independentButton.addEventListener('click', () => {
    removeChildren(congressGrid)
    populateCongressDiv(filterCongressPeople(senators, 'ID'))
})

missedVotes.addEventListener('click', () => {
    populateCongressDiv(missedVotesMember(senators))
})

seniorityButton.addEventListener('click', () => {
    removeChildren(congressGrid)
    senioritySort()})

function populateCongressDiv(simplifiedList) {
    removeChildren(congressGrid)
    simplifiedList.forEach(person => {
        let personDiv = document.createElement('div')
        personDiv.className = 'figureDiv'
        let personFig = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')
        let partyIcon = document.createElement('i')
        if (person.party === 'R') partyIcon.className = 'fas fa-republican'
        if (person.party === 'D') partyIcon.className = 'fas fa-democrat'
        if (person.party === 'ID') partyIcon.className = 'fas fa-mitten'

        figImg.src = person.imgURL
        figCaption.textContent = person.name
        personFig.appendChild(figImg)
        personFig.appendChild(figCaption)
        personDiv.appendChild(personFig)
        personDiv.appendChild(partyIcon)
        congressGrid.appendChild(personDiv)
    })
}

function getSimplifiedPeople(peopleList) {
    return peopleList.map(person => {
        let middleName = person.middle_name ? ` ${person.middle_name}` : ``
        return {
            id: person.id,
            name: `${person.first_name}${middleName} ${person.last_name}`,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${person.govtrack_id}-100px.jpeg`,
            seniority: parseInt(person.seniority, 10),
            party: person.party,
            missed_votes_pct: person.missed_votes_pct
        }
    })
}

function senioritySort() {
    populateCongressDiv(getSimplifiedPeople(senators).sort((a, b) => a.seniority - b.seniority).reverse())
}

const filterCongressPeople = (chamber, politicalParty) => {
    return getSimplifiedPeople(chamber).filter(member => member.party === politicalParty)
}

const missedVotesMember = (chamber) => {
    const highestMissedVotesPerson = getSimplifiedPeople(chamber).reduce((acc, member) => acc.missed_votes_pct > member.missed_votes_pct ? acc : member)
    return getSimplifiedPeople(chamber).filter((person) => person.missed_votes_pct === highestMissedVotesPerson.missed_votes_pct)
}

populateCongressDiv(getSimplifiedPeople(senators))
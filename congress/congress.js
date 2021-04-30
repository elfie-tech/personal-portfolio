import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'

const congressGrid = document.querySelector('.congressGrid')
const seniorityButton = document.querySelector('#seniorityButton')
const republicansButton = document.querySelector('#republicans')
const missedVotes = document.querySelector('#missedVotes')
const democratButton = document.querySelector('#democrats')
const independentButton = document.querySelector('#independents')

//this click event filters only the republicans
republicansButton.addEventListener('click', () => {
    removeChildren(congressGrid)
    populateCongressDiv(filterCongressPeople(representatives, 'R'))
})

//this click event filters only the democrats
democratButton.addEventListener('click', () => {
    removeChildren(congressGrid)
    populateCongressDiv(filterCongressPeople(representatives, 'D'))
})

//this click event filters only the independents
independentButton.addEventListener('click', () => {
    removeChildren(congressGrid)
    populateCongressDiv(filterCongressPeople(senators, 'ID'))
})

//this click event filters only the people who have missed the most votes
//I know this is code that you came up with - I did play around with it, but I wasn't able to get it to work so I used the code you provided 
missedVotes.addEventListener('click', () => {
    populateCongressDiv(missedVotesMember(senators))
})

//this click event filters people by seniority
seniorityButton.addEventListener('click', () => {
    removeChildren(congressGrid)
    senioritySort()})

//this function creates the div that holds the images and names of the people of congress
function populateCongressDiv(simplifiedList) {
    removeChildren(congressGrid)
    simplifiedList.forEach(person => {
        let personDiv = document.createElement('div')
        personDiv.className = 'figureDiv'
        let personFig = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')
        let partyIcon = document.createElement('i')
    //these if statements allow the browser to filter out which color and party icon to use
        if (person.party === 'R') partyIcon.className = 'fas fa-republican'
        if (person.party === 'R')
        personDiv.style.backgroundColor = "#9D2100"
        if (person.party === 'D') partyIcon.className = 'fas fa-democrat'
        if (person.party === 'D')
        personDiv.style.backgroundColor = "#1B2682"
        if (person.party === 'ID') partyIcon.className = 'fas fa-mitten'
        if (person.party === 'ID')
        personDiv.style.backgroundColor = "#0B661A"

        figImg.src = person.imgURL
    //used dot notation to get the name of the congress person
        figCaption.textContent = person.name
        personFig.appendChild(partyIcon)
        personFig.appendChild(figImg)
        personFig.appendChild(figCaption)
        personDiv.appendChild(personFig)

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

//this uses reduce to bring only members of congress who have the highest percentage of missed votes
//again, I know this is code you wrote - I did not have time to play around with this one
const missedVotesMember = (chamber) => {
    const highestMissedVotesPerson = getSimplifiedPeople(chamber).reduce((acc, member) => acc.missed_votes_pct > member.missed_votes_pct ? acc : member)
    return getSimplifiedPeople(chamber).filter((person) => person.missed_votes_pct === highestMissedVotesPerson.missed_votes_pct)
}

populateCongressDiv(getSimplifiedPeople(senators))
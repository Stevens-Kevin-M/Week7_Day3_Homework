//Form Submission
let form = document.querySelector('#FormData')

// Geting data with Axios
const getData = async() =>{
    let season=document.querySelector("#year").value;
    let round=document.querySelector("#round").value;
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    return response.data
}

//create const to hold our DOM elements for later use
const DOM_ELEMENTS = {
    racer_data:'#racer-data'
}

// Creation of Range List
const create_list = (pos,name,nationality,sponsor,points) => {
    const html= `<a href="#" class="list-group-item list-group-item-action list-group-item-light" style="justify-content:space-between"> ${pos} ${name} ${nationality} ${sponsor} ${points} </a>`;
    document.querySelector(DOM_ELEMENTS.racer_data).insertAdjacentHTML('beforeend',html) // allows search where you can choose where to inject html elem  above
}

const load_data= async()=>{
    const racers_data= await getData(); //waiting for data, once it gets data it will use response.data return from getData()
    let racers = racers_data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    console.log(racers)
    for (i = 0; i < 7; i++){
            // Getting first and last name
            let first_name = racers[i].Driver.givenName
            let last_name = racers[i].Driver.familyName
            let full_name = first_name + " " + last_name
            let display_name = document.createElement("td")
            console.log(display_name)
            display_name.innerHTML = full_name
            document.querySelector(`#table-row-${i}`).append(display_name)

            // Getting Nationality
            let nationality = racers[i].Driver.nationality
            let display_nationailty = document.createElement("td")
            console.log(display_name)
            display_nationailty.innerHTML = nationality
            document.querySelector(`#table-row-${i}`).append(display_nationailty)

            // Getting Sponsor
            let sponsor = racers[i].Constructors[0].name
            let display_sponsor = document.createElement("td")
            console.log(display_sponsor)
            display_sponsor.innerHTML = sponsor
            document.querySelector(`#table-row-${i}`).append(display_sponsor)

            // Getting Points
            let points = racers[i].points
            let display_points = document.createElement("td")
            console.log(display_points)
            display_points.innerHTML = points
            document.querySelector(`#table-row-${i}`).append(display_points)
    }
    // console.log(racers)
    // racers.forEach(element=>create_list(element.position,element.Driver.givenName + " " + element.Driver.familyName,element.Driver.nationality,element.Constructors[0].name,element.points)) // data will be array, so we need to pull id,name from each element, pass those into create_list above
}

//add event listener
form.addEventListener('submit',(event)=>{
    let season=document.querySelector("#year").value;
    let round=document.querySelector("#round").value;
    event.preventDefault()
    return season,round
})
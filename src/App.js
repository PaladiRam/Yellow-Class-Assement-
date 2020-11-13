import React from 'react';
import './App.css'
import CardContainer from './components/CardContainer'
import unsplash from './api/unsplash'
import Image from './images/Card.jpg'
import './components/animate.css'

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
const onSearchSubmit = async (term) => {
  const response = await unsplash.get('/search/photos', {
      
params: { query: term }
})
return response.data
}

let setPlay = "PLAY"
class App extends React.Component {


  state = ({
    Termstate: "",
    ListState: [],
    Compare: [],
    WrongG: 0,
    CorrectG: 0

  })


onChange = (e) => {
  this.setState({Termstate: e.target.value})
}
onSubmit = async (e) => {
  e.preventDefault()
  console.log(this.state.Termstate)
  const list =  await onSearchSubmit(this.state.Termstate)
  let listFilter = list.results.map(el => 
    {return {
      img: el.urls.regular,
      specialid: el.id,
      id: el.id,
      status: "open",
      won: 0}
    });
    console.log(listFilter)
    let anotherList = JSON.parse(JSON.stringify(listFilter))
    anotherList.forEach(x => {
    x.specialid = x.specialid + 1;

    })
    console.log(anotherList)


  const NewArr = [...listFilter, ...anotherList]
const finalArr = shuffle(NewArr)
  this.setState({ListState: finalArr, WrongG: 0, CorrectG: 0, Termstate: ""})

  setTimeout(() => {
    this.Play()
  }, 3000);

}
 Play = () => {
  let newListState = JSON.parse(JSON.stringify(this.state.ListState))
  console.log(newListState)
newListState.forEach(x => {x.status="closed"})
console.log(newListState)
this.setState({ListState: [...newListState]})
  
}
SendId = (specialid, id) => {
let newListState = JSON.parse(JSON.stringify(this.state.ListState))
console.log(newListState)
newListState.forEach(x => {if(x.specialid===specialid){x.status="open"}})
console.log(newListState)
this.setState({ListState: [...newListState], Compare: [...this.state.Compare, id]})

}


componentDidUpdate(){
  if(this.state.Compare.length === 2){
    setTimeout(() => {
if(this.state.Compare[0] === this.state.Compare[1]){
  let newListState = JSON.parse(JSON.stringify(this.state.ListState))
  console.log(newListState)
newListState.forEach(x => {if(x.id===this.state.Compare[0]){x.won=1}})
console.log(newListState)
this.setState({ListState: [...newListState], Compare: [], CorrectG: this.state.CorrectG + 1})
if(this.state.ListState.filter(x => x.won === 1).length === 20){
  let newsListState = JSON.parse(JSON.stringify(this.state.ListState))
  console.log(newListState)
newsListState.forEach(x => {x.img = "won"})
console.log(newsListState)
this.setState({ListState: [...newsListState], Compare: []})

}
}
if(this.state.Compare[0] !== this.state.Compare[1]){
  let newListState = JSON.parse(JSON.stringify(this.state.ListState))
  console.log(newListState)
newListState.forEach(x => {if(x.won === 0){x.status = "closed"}})
console.log(newListState)
this.setState({ListState: [...newListState], Compare: [], WrongG: this.state.WrongG + 1})

}
else {}
}, 800);

setPlay = "REPLAY"
}
}
render(){
  
  return (
    <div className="Main">
    <div className="App">
      <div className="leftSide">
    <p>Wrong Steps:<span className="score red">{this.state.WrongG}</span></p>
    <p>Correct Steps:<span className="score green">{this.state.CorrectG}</span></p>
      </div>
      <form onSubmit={this.onSubmit}>
        < input type="text" className="input" value={this.state.Termstate} onChange={this.onChange} placeholder="Type in a keyword to search for pictures and press play/replay" />
        < input  className="input2"type="submit" value={setPlay} />
      </form>
      {/* <div className="rightSide">
      <p>Wrong Steps:<span>{this.state.WrongG}</span></p>
    <p>Correct Steps:<span>{this.state.CorrectG}</span></p>
      </div> */}
      </div>
      <div className='BigBorder'><div className="SmallBorder"></div></div>
  <CardContainer SendId={this.SendId} Compare={this.state.Compare} ListState={ this.state.ListState } />
      <div className='BigBorder'><div className="SmallBorder"></div></div>
    </div>
  )}
}

export default App;

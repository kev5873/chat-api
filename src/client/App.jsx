import React, { Component } from 'react'
import request from 'superagent'
import ChatWindow from './ChatWindow'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      conversation: false,
      chatId: '',
      timestamp: '',
      messages: [],
      name: '',
    }
    this.createNew = this.createNew.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.joinExisting = this.joinExisting.bind(this)
  }

  handleChange(event) {
    this.setState({chatId: event.target.value});
  }

  createNew() {
    request
      .post('//localhost:8000/thread')
      .set('Accept', 'application/json')
      .end( (err, res) => {
        const { timestamp, _id } = res.body
        this.setState({ timestamp, chatId: _id, conversation: true })
      })
  }

  joinExisting() {
    request
      .get(`//localhost:8000/thread/${this.state.chatId}`)
      .set('Accept', 'application/json')
      .end( (err, res) => {
        if (err) {
          alert(res.body.error)
        } else {
          const { timestamp, _id, messages } = res.body
          this.setState({ timestamp, chatId: _id, messages: messages, conversation: true })
        }
      })
  }

  render() {
    const { conversation } = this.state
    let showElements = []
    if (!conversation) {
      showElements.push(
        <div onClick={this.createNew} key="startNew"> Click here to start a new conversation </div>,
        <div style={{ marginTop: '15px' }} key="joinExisting">
          Enter Chat ID: <input type="text" value={this.state.chatId} onChange={this.handleChange} />
          <span onClick={this.joinExisting}> Join conversation </span>
        </div>,
      )
    } else {
      showElements = (<ChatWindow
        chatId={this.state.chatId}
        timestamp={this.state.timestamp}
        messages={this.state.messages}
      />)
    }
    return (
      <div>
        {showElements}
      </div>
    )
  }
}

export default App

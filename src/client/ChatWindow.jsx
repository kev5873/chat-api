import React, { Component } from 'react'
import request from 'superagent'

class ChatWindow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: `user${parseInt(Math.random()*10000,10)}`,
      message: '',
      messages: this.props.messages.reverse(),
    }
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeMessage = this.handleChangeMessage.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value })
  }
  handleChangeMessage(event) {
    this.setState({ message: event.target.value })
  }

  sendMessage() {
    const { name, message } = this.state
    this.setState({ message: '' })
    request
      .post(`//localhost:8000/thread/${this.props.chatId}`)
      .set('Accept', 'application/json')
      .send({ user: name, message })
      .end( (err, res) => {
        if (res.status === 200) {
          this.updateMessages()
        }
      })
  }

  updateMessages() {
    request
      .get(`//localhost:8000/thread/${this.props.chatId}`)
      .set('Accept', 'application/json')
      .end( (err, res) => {
        const { timestamp, _id, messages } = res.body
        this.setState({ timestamp, chatId: _id, messages: messages.reverse(), conversation: true })
      })
  }

  componentDidMount() {
    setInterval( () => {
      this.updateMessages()
    }, 5000)
  }

  render() {
    const { chatId, timestamp } = this.props
    const { messages } = this.state
    return (
      <div>
        <div>{`Chat ID: ${chatId} | Time Started: ${timestamp}`}</div>
        <div>
        {
          messages.map(item => {
            return (<div key={item.timestamp}>{`${item.user} - ${item.timestamp} : ${item.message}`}</div>)
          })
        }
        </div>
        <div>
          <input type="text" value={this.state.name} onChange={this.handleChangeName} />
          <input type="text" value={this.state.message} onChange={this.handleChangeMessage} />
          <input type="button" value="Send" onClick={this.sendMessage}/>
        </div>
      </div>
    )
  }

}

export default ChatWindow

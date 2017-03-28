import app from 'app'

export default {
  'test' (event, message) {
    // Test this event in your console by typing `app.events.fire('example.test', 'There was an error testing the event [example.test]!')`
    error(message)
  }
}

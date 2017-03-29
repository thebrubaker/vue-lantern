/**
 * Register an event channel. All topics will be namespaced with the name of the file.
 * The application is passed in as the only argument and the function should
 * return an object of event topics.
 * @param  {Lantern} app  The application.
 * @return {object}  An events object.
 */
export default function (app) {
  return {
    'test' (event, message) {
      // Test this event in your console by typing `app.events.fire('example.test', 'There was an error testing the event [example.test]!')`
      error(message)
    }
  }
}

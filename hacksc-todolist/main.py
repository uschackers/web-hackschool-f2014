import webapp2
import os
from lists_handler import ListsHandler, ListDetailsHandler, NewListHandler
from tasks_handler import TaskDetailsHandler, NewTaskHandler
from google.appengine.ext.webapp import template

class MainHandler(webapp2.RequestHandler):
  def get(self):
    path = os.path.join(os.path.dirname(__file__), 'templates', 'index.html')
    self.response.out.write(template.render(path, {}))

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/lists', ListsHandler),
    ('/lists/new', NewListHandler),
    ('/lists/(.+)', ListDetailsHandler),
    ('/tasks/new', NewTaskHandler),
    ('/tasks/(.+)', TaskDetailsHandler),
], debug=True)

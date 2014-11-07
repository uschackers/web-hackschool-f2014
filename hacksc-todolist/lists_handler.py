import json
import webapp2
from models import List, Task

class ListsHandler(webapp2.RequestHandler):
  def get(self):
    results = []
    q = List.query()
    for list in q.iter():
      results.append(list.to_dict())

    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(json.dumps(results));

class ListDetailsHandler(webapp2.RequestHandler):
  def get(self, list_id):
    results = []
    q = Task.query(Task.list_id == list_id)
    for task in q.iter():
      results.append(task.to_dict())

    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(json.dumps(results))

  def delete(self, list_id):
    list = List.get_by_id(int(list_id))
    list.key.delete()

    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(json.dumps({'ok': True}))


class NewListHandler(webapp2.RequestHandler):
  def post(self):
    list_name = self.request.get('listName')
    list = List(name = list_name)
    list.put()

    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(json.dumps(list.to_dict()))

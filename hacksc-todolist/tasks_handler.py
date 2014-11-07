import json
import webapp2
from models import List, Task

class TaskDetailsHandler(webapp2.RequestHandler):
  def put(self, task_id):
    task = Task.get_by_id(int(task_id))
    task.title = self.request.get('taskTitle')
    task.complete = self.request.get('taskComplete') == '1'
    task.put()

    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(json.dumps(task.to_dict()))

  def delete(self, task_id):
    task = Task.get_by_id(int(task_id))
    task.key.delete()

    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(json.dumps({'ok': True}))


class NewTaskHandler(webapp2.RequestHandler):
  def post(self):
    list_id = self.request.get('listId')
    task_title = self.request.get('taskTitle')
    task = Task(list_id = list_id, title = task_title)
    task.put()

    self.response.headers['Content-Type'] = 'application/json'
    self.response.out.write(json.dumps(task.to_dict()))

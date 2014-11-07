from google.appengine.ext import ndb

class List(ndb.Model):
  name = ndb.StringProperty()

  def to_dict(self):
  	return { 'id': self.key.id(), 'name': self.name }


class Task(ndb.Model):
	title = ndb.StringProperty()
	list_id = ndb.StringProperty()
	complete = ndb.BooleanProperty(default=False)

	def to_dict(self):
		return { 'id': self.key.id(), 'title': self.title, 'list_id': self.list_id, 'complete': self.complete }



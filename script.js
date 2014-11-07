var List = function(listName, listID, container) {
  var newList = {
    name: listName,
    id: listID,
    el: container,
    children: [],
    initialize: function() {
      
    },
    render: function() {
      $(container).append('<div class="item list" id="list_' + this.id + '"><div class="name">' + this.name + '</div><div class="close">&times;</div></div>');
    },
    renderChildren: function(force) {
      $('.tasks')
      if(force || this.children.length === 0) {
        childrenData = null;
        $.get( "/lists/" + this.id, function(data) {
          childrenData = data;
        });
        if(childrenData == null) { return; }
        for(var childData in childrenData) {
          var thisChild = newListItem(childData.title, childData.id, childData.listId, childData.completed, '.tasks');
          this.children.append(child);
        }
      }
      for(var child in this.children) {
        child.render();
      }
    },
    unrenderChildren: function() {
      for(var child in this.children) {
        child.unrender();
      }
    }
  };
  newList.initialize();
  return newList;
};

var ListItem = function(listItemName, listItemID, parentID, taskCompleted, container) {
  var newListItem = {
    name: listItemName,
    id: listItemID,
    pid: parentID,
    completed: taskCompleted,
    el: container,
    initialize: function() {
      
    },
    render: function() {
      $(container).append('<div class="item task" id="task_' + this.id + '"><div class="name">' + this.name + '</div><input type="checkbox" class="complete"></div>');
    },
    unrender: function() {
      $('.task_' + this.id).remove();
    }
  };
  newListItem.initialize();
  return newListItem;
};

allLists = [];
allListsData = null;
$.get( "/lists", function(data) {
  allListsData = data;
});

for(var listData in allListsData) {
  var createdList = new List(listData.name, listData.id, '.lists');
  allLists.append(createdList);
  createdList.render();
}
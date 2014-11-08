$(document).ready(function() {

var List = function(listName, listID, container) {
  var newList = {
    name: listName,
    id: listID,
    el: container,
    children: [],
    initialize: function() {

    },
    render: function() {
      $(container).append('<li class="item list" id="list_' + this.id + '"><div class="name">' + this.name + '</div><div class="close">&times;</div></li>');
      this.setUpHandlers();
    },
    setUpHandlers: function() {
      var that = this;
      $('#list_' + this.id + ' .name').click(function(e) {
        if($('.selected')) {
          $('.selected').removeClass('selected');
        }
        $('#list_' + that.id).addClass('selected');
        if(selectedList) {
          selectedList.unrenderChildren()
        }
        selectedList = that;
        selectedList.renderChildren();
      })
      $('#list_' + this.id + ' .close').click(function(e) {
        if(selectedList === $('#list_' + that.id)) {
          selectedList.unrenderChildren();
        }
        $('#list_' + that.id).remove();
        $.ajax({
          url: '/lists/' + that.id,
          type: 'DELETE',
          success: function() {
            $('.lists').find('li').find('.name')[0].click();
          }
        });
      })
    },
    renderChildren: function(force) {
      var that = this;
      this.unrenderChildren();
      if(force || this.children.length === 0) {
        $.get( "/lists/" + this.id, function(data) {
          for(var childIndex in data) {
          var childData = data[childIndex];
          var thisChild = new ListItem(childData.title, childData.id, childData.list_id, childData.complete, '.tasks');
          that.children.push(thisChild);
        }
        });
      }
      for(var childIndex in this.children) {
        this.children[childIndex].render();
      }
    },
    unrenderChildren: function() {
      for(var childIndex in this.children) {
        this.children[childIndex].unrender();
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
      $(container).append('<li class="item task" id="task_' + this.id + '"><div class="name">' + this.name + '</div><input type="checkbox" class="complete"></li>');
    },
    setUpHandlers: function() {
      var that = this;
      $('#task_' + this.id + ' .complete').click(function() {
        if(that.complete != $('#task_' + that.id + ' .complete').is(':checked')) {
          
        }
      });
    },
    unrender: function() {
      $('#task_' + this.id).remove();
    }
  };
  newListItem.initialize();
  return newListItem;
};

selectedList = null;

$.get( "/lists", function(data) {
  for(var index in data) {
    var listData = data[index];
    var createdList = new List(listData.name, listData.id, '.lists');
    createdList.render();
  }
});

$('.addlist button').click(function() {
  data = { listName: $('.addlist input').val() }
  $.post( "/lists/new", data, function(res) {
    var createdList = new List(res.name, res.id, '.lists');
    createdList.render();
  });
})

$('.addtask button').click(function() {
  if(selectedList === null) { return; }
  data = { listId: selectedList.id, taskTitle: $('.addtask input').val() }
  $.post( "/tasks/new", data, function(res) {
    var createdTask = new ListItem(res.title, res.id, res.list_id, res.complete, '.tasks');
    selectedList.children.push(createdTask);
    selectedList.renderChildren(false);
  });
})

});

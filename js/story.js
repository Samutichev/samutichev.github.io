// Story functions

let actions = []
let names = []
let objects = []

function story(action, name, object) {
	actions.push(action)
	names.push(name)
	objects.push(object)
}

function remove() {
	actions.pop()
	names.pop()
}

function undo() {
	let previous_action = actions[actions.length - 1]
	if (previous_action == 'added') {
		canvas.remove(canvas.getItemByName(names[names.length - 1]))
		remove()
	} else if (previous_action == 'modified') {
		let objectName = names[names.length - 1]
		let objectIndex = names.lastIndexOf(objectName, 0)
		let object = JSON.parse(objects[objectIndex])
		canvas.remove(canvas.getItemByName(object.name))
		fabric.util.enlivenObjects([object], function (enlivenedObjects) {
			canvas.add(enlivenedObjects[0])
			canvas.requestRenderAll()
		})
		remove()
	} else if (!isNaN(previous_action)) {
		canvas.discardActiveObject()
		let i = true
		let a = 0
		while (!isNaN(actions[actions.length - 1]) && i) {
			let object = JSON.parse(objects[objects.length - 1])
			canvas.remove(canvas.getItemByName(object.name))
			canvas.requestRenderAll()
			a++
			if (actions[actions.length - 1] == 0) {
				i = false
			}
		}
		while (a > 0) {
			fabric.util.enlivenObjects([JSON.parse(objects[objects.length - a])], function (enlivenedObjects) {
				canvas.add(enlivenedObjects[0])
				a--
			})
		}
	}
}

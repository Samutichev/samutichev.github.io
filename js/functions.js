// Сlear board
function clearBoard() {
	board.style.transform = `scale(0.8)`
	board.style.opacity = 0
	setTimeout(() => {
		scene.innerHTML = ''
		board.style.opacity = 1
		board.style.transform = `scale(1)`
	}, 150)
}
document.addEventListener('keydown', function (event) {
	if (event.code == 'Delete') {
		clearBoard()
	}
})

// Add image
function addImage(event) {
	let image = document.createElementNS('http://www.w3.org/2000/svg', 'image')
	let imageUrl = URL.createObjectURL(event.target.files[0])
	let imageData = document.createElement('img')
	imageData.onload = function () {
		let position_x = board.width.baseVal.value.toFixed(0) / 2 / transformScale - imageData.width / 2 / transformScale - transformX / transformScale
		let position_y = board.height.baseVal.value.toFixed(0) / 2 / transformScale - imageData.height / 2 / transformScale - transformY / transformScale
		image.setAttributeNS(null, 'width', imageData.width / transformScale)
		image.setAttributeNS(null, 'height', imageData.height / transformScale)
		image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', imageUrl)
		image.setAttributeNS(null, 'x', position_x)
		image.setAttributeNS(null, 'y', position_y)
		scene.append(image)
		emitObject(image)
		file.value = ''
	}
	imageData.src = imageUrl
}

options = {
	color: 0,
	size: 1,
	pattern: 0
}
// Change pen colors by scrolling
function scrollColor(event) {
	colorOptions = ['#000000', '#d01919', '#eaae00', '#16ab39', '#1678c2', customColor]
	if (event.deltaY > 0) {
		options.color += 1
		if (options.color == colorOptions.length) {
			options.color = 0
		}
	} else {
		if (!options.color) {
			options.color = colorOptions.length
		}
		options.color -= 1
	}
	setBrush({ color: colorOptions[options.color] })
}
// Change size of drawing subject by scrolling
function scrollSize(event) {
	sizeOptions = [3, 4, 5]
	if (event.deltaY > 0) {
		options.size += 1
		if (options.size == sizeOptions.length) {
			options.size = 0
		}
	} else {
		if (!options.size) {
			options.size = sizeOptions.length
		}
		options.size -= 1
	}
	setBrush({ size: sizeOptions[options.size] })
}
// Change board patterns by scrolling
function scrollPattern(event) {
	patternOptions = ['none', 'sq', 'line', 'dot']
	if (event.deltaY > 0) {
		options.pattern += 1
		if (options.pattern == patternOptions.length) {
			options.pattern = 0
		}
	} else {
		if (!options.pattern) {
			options.pattern = patternOptions.length
		}
		options.pattern -= 1
	}
	setPattern(patternOptions[options.pattern])
}

// Copy page link
function copyLink() {
	navigator.clipboard
		.writeText(window.location.href)
		.then(() => {
			// Link copied successfully!
		})
		.catch((err) => {
			console.log('Something went wrong', err)
		})
}
document.addEventListener('keydown', function (event) {
	if (event.code == 'KeyC' && (event.ctrlKey || event.metaKey)) {
		copyLink()
	}
})

// Effects
// "Fade in"
const fadeIn = (cl, timeout) => {
	let element = document.querySelector(cl)
	element.style.opacity = 0
	element.style.display = 'flex'
	element.style.transition = `opacity ${timeout}ms`
	setTimeout(() => {
		element.style.opacity = 1
	}, 10)
}
// "Fade out"
const fadeOut = (cl, timeout) => {
	let element = document.querySelector(cl)
	element.style.opacity = 1
	element.style.transition = `opacity ${timeout}ms`
	element.style.opacity = 0

	setTimeout(() => {
		element.style.display = 'none'
	}, timeout)
}

// Command
function sendCommand(command) {
	console.log('New command:', command)
}

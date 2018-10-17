const fr = require('face-recognition')

fr.winKillProcessOnExit()

const detector = fr.FaceDetector()

const img = fr.loadImage('./components/FRTest/pic.jpg')

console.log('detecting faces')
const faceSize = 150
const faces = detector.detectFaces(img, faceSize)

const win = new fr.ImageWindow()
win.setImage(fr.tileImages(faces))
fr.hitEnterToContinue()

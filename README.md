## Face-finder

This app is based on SmartBrain from Andrei Neagoie's [Complete Web Developer]
(https://www.udemy.com/the-complete-web-developer-zero-to-mastery) Udemy course.

However I didn't want to be tied to a commercial API and wanted to understand a
bit more about how the face recognition works, so built it around an open source
face recognition library [face-api](https://github.com/justadudewhohacks/face-api.js)
instead.

It is designed to work alongside a simple back-end ([face-finder-api]
(https://github.com/markcollis/face-finder-api)) that keeps
track of user registration and usage as well as providing a CORS proxy.
